import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Refresh Token DTO
 * Data transfer object for token refresh
 */
export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty({ message: 'Refresh token is required' })
  refreshToken: string;
}
