import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import EntityManagerService from 'src/entity-manager/entity-manager.service';
import { User } from './entities/user.entity';
import { SuccessfulResponse } from 'src/common/http-response';
import { AuthClientService, EVENTS } from 'src/microservices/auth/auth-client.service';

@Injectable()
export class UserService {
  constructor(private readonly entityManager: EntityManagerService, private authClient: AuthClientService) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto)
    const createdUser = await this.entityManager.save(user)
    await this.authClient.sendMessage(EVENTS.LOGIN_USER, { userId: createdUser.id });
    return new SuccessfulResponse({ entity: createdUser })
  }

}
