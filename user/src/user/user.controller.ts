import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { USER_EVENT } from 'src/common/events/types';
import { IResponse } from 'src/common/config';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern(USER_EVENT.CREATE_USER)
  async create(createUserDto: CreateUserDto): Promise<IResponse<User>> {
    const resp = await this.userService.create(createUserDto);
    return resp;
  }
}
