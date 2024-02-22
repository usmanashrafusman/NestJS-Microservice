import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import EntityManagerService from 'src/database/entity-manager/entity-manager.service';
import { Session } from './entities/session.entity';
import { TokenService } from 'src/token/token.service';
import { SessionRepository } from './repositories/session.repository';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly tokenService: TokenService,
  ) {}

  async createToken(createSessionDto: CreateSessionDto) {
    const { token, secret } = this.tokenService.createToken(createSessionDto);
    const session = new Session({ token, secret });
    const newSession = await this.sessionRepository.save(session);
    return { token: newSession.token };
  }
}
