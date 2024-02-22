import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TOPICS } from 'src/common/topics/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(TOPICS.CREATE_USER)
  async create(createUserDto: CreateUserDto) {
    const resp = await this.userService.create(createUserDto);
    return resp;
  }
}
