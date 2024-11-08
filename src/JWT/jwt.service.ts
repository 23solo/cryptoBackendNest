import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  generateToken(userId: number, username: string): string {
    const payload = { userId, username };
    console.log('Secret is');

    return this.jwtService.sign(payload, { secret: process.env.secret });
  }
}
