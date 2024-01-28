import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import EntityManagerService from 'src/entity-manager/entity-manager.service';
import { Session } from './entities/session.entity';
import { SuccessfulResponse } from 'src/common/http-response';

@Injectable()
export class AuthService {
  constructor(private readonly entityManager: EntityManagerService) { }

  async create(createSessionDto: CreateSessionDto) {
    const session = new Session({ ...createSessionDto, token: "token-string", key: "key sting" })
    const newSession = await this.entityManager.save(session)
    return new SuccessfulResponse({ entity: newSession })
  }

}
