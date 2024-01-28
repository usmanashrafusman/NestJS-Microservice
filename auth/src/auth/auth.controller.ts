import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_EVENT } from 'src/common/events/types';
import { IResponse } from 'src/common/config';
import { Session } from './entities/session.entity';

@Controller('user')
export class AuthContoller {
  constructor(private readonly authService: AuthService) { }

  @MessagePattern(AUTH_EVENT.LOGIN_USER)
  async create(createUserDto: CreateSessionDto): Promise<IResponse<Session>> {
    const resp = await this.authService.create(createUserDto);
    return resp;
  }
}
