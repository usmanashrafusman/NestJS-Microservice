import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/database/base-repository/base-repository';
import { User } from '../entities/user.entity';
import EntityManagerService from 'src/database/entity-manager/entity-manager.service';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(entityManager: EntityManagerService) {
    super(entityManager, User);
  }

  findByEmail(email: string) {
    return this.findOneBy({ email });
  }
}
