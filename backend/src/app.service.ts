import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to Q-Bridge API - Quality Assurance Management System for TPI';
  }
}
