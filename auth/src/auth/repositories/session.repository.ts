import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base-repository/base-repository';
import EntityManagerService from 'src/database/entity-manager/entity-manager.service';
import { Session } from '../entities/session.entity';

@Injectable()
export class SessionRepository extends BaseRepository<Session> {
  constructor(entityManager: EntityManagerService) {
    super(entityManager, Session);
  }
}
