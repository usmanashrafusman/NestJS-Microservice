import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UserService } from './user.service';
import { IResponse } from 'src/common/config';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<IResponse<any>> {
    return this.userService.create(user);
  }
}
