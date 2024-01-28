import { Body, Controller, Post } from '@nestjs/common';
import { EVENTS, UserClientService } from 'src/microservices/user/user-client.service';
import { CreateUserDto } from './dto/create-user-dto';

@Controller("user")
export class UserController {
  constructor(private userService: UserClientService) { }

  @Post()
  async getUser(@Body() user: CreateUserDto) {
    return await this.userService.sendMessage(EVENTS.CREATE_USER, user);
  }
}
