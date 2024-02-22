import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: any) {
    const secret = randomBytes(20).toString('hex');
    const token = this.jwtService.sign(payload, { secret });
    return { token, secret };
  }
}
