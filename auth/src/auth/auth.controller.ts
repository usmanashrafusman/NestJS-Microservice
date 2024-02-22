import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TOPICS } from 'src/common/topics/types';
import { AuthService } from './auth.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(TOPICS.CREATE_AUTH_TOKEN)
  async createAuthToken(createToken: CreateSessionDto) {
    const resp = await this.authService.createToken(createToken);
    return resp;
  }
}
