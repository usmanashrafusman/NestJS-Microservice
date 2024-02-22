import { Injectable } from '@nestjs/common';
import { UserClientService } from 'src/microservices/user/user-client.service';
import { CreateUserDto } from './dto/create-user-dto';
import { SuccessfulResponse } from 'src/common/response';

@Injectable()
export class UserService {
  constructor(private userService: UserClientService) {}

  async create(user: CreateUserDto) {
    const entity = await this.userService.createUser<CreateUserDto>(user);
    return SuccessfulResponse.send({ entity });
  }
}
