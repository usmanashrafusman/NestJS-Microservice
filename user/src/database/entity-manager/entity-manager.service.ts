import { Injectable, Scope } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export default class EntityManagerService extends EntityManager {
  constructor(dataSource: DataSource) {
    const queryRunner = dataSource.createQueryRunner();
    super(dataSource, queryRunner);
  }

  async initialize() {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }
}
