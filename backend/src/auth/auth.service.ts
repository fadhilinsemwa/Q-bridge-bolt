import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '@prisma/client';
import { randomBytes } from 'crypto';

/**
 * Auth Service
 * Handles all authentication logic including registration, login, token management
 */
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Register a new user
   */
  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Check for duplicate student ID or employee ID
    if (registerDto.studentId) {
      const existingStudent = await this.prisma.user.findUnique({
        where: { studentId: registerDto.studentId },
      });
      if (existingStudent) {
        throw new ConflictException('Student ID already exists');
      }
    }

    if (registerDto.employeeId) {
      const existingEmployee = await this.prisma.user.findUnique({
        where: { employeeId: registerDto.employeeId },
      });
      if (existingEmployee) {
        throw new ConflictException('Employee ID already exists');
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Generate email verification token
    const emailVerificationToken = randomBytes(32).toString('hex');

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        middleName: registerDto.middleName,
        role: registerDto.role,
        studentId: registerDto.studentId,
        employeeId: registerDto.employeeId,
        department: registerDto.department,
        program: registerDto.program,
        emailVerificationToken,
      },
    });

    // Log audit
    await this.createAuditLog(user.id, 'USER_REGISTERED', 'User', user.id);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    // TODO: Send verification email
    // await this.sendVerificationEmail(user.email, emailVerificationToken);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
      message: 'Registration successful. Please check your email to verify your account.',
    };
  }

  /**
   * Login user
   */
  async login(loginDto: LoginDto) {
    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (user.status !== 'ACTIVE' && user.status !== 'PENDING_VERIFICATION') {
      throw new UnauthorizedException('Account is suspended or inactive');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Log audit
    await this.createAuditLog(user.id, 'USER_LOGIN', 'User', user.id);

    // Generate tokens
    const tokens = await this.generateTokens(user);

    return {
      user: this.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string) {
    // Find refresh token
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Check if token is expired
    if (tokenRecord.expiresAt < new Date()) {
      // Delete expired token
      await this.prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });
      throw new UnauthorizedException('Refresh token expired');
    }

    // Generate new tokens
    const tokens = await this.generateTokens(tokenRecord.user);

    // Delete old refresh token
    await this.prisma.refreshToken.delete({
      where: { id: tokenRecord.id },
    });

    return {
      user: this.sanitizeUser(tokenRecord.user),
      ...tokens,
    };
  }

  /**
   * Logout user
   */
  async logout(userId: string, refreshToken?: string) {
    if (refreshToken) {
      // Delete specific refresh token
      await this.prisma.refreshToken.deleteMany({
        where: {
          userId,
          token: refreshToken,
        },
      });
    } else {
      // Delete all refresh tokens for user
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      });
    }

    // Log audit
    await this.createAuditLog(userId, 'USER_LOGOUT', 'User', userId);

    return { message: 'Logged out successfully' };
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid verification token');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        status: 'ACTIVE',
      },
    });

    // Log audit
    await this.createAuditLog(user.id, 'EMAIL_VERIFIED', 'User', user.id);

    return { message: 'Email verified successfully' };
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a password reset link has been sent' };
    }

    // Generate reset token
    const resetToken = randomBytes(32).toString('hex');
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: resetToken,
        passwordResetExpires: resetExpires,
      },
    });

    // TODO: Send password reset email
    // await this.sendPasswordResetEmail(user.email, resetToken);

    // Log audit
    await this.createAuditLog(user.id, 'PASSWORD_RESET_REQUESTED', 'User', user.id);

    return { message: 'If the email exists, a password reset link has been sent' };
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpires: null,
      },
    });

    // Delete all refresh tokens (force re-login)
    await this.prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    // Log audit
    await this.createAuditLog(user.id, 'PASSWORD_RESET', 'User', user.id);

    return { message: 'Password reset successfully' };
  }

  /**
   * Generate JWT tokens
   */
  private async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    // Generate access token (15 minutes)
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '15m',
    });

    // Generate refresh token (7 days)
    const refreshToken = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // Store refresh token
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutes in seconds
    };
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: User) {
    const { password, passwordResetToken, emailVerificationToken, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Create audit log entry
   */
  private async createAuditLog(
    userId: string,
    action: string,
    entity: string,
    entityId: string,
    changes?: any,
  ) {
    await this.prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        entityId,
        changes,
      },
    });
  }
}
