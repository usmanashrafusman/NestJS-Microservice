import {
  DataSource,
  EntityManager,
  EntityTarget,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';

export class BaseRepository<T> {
  constructor(
    private entityManager: EntityManager,
    private entity: EntityTarget<T>,
  ) {}

  private getRepository() {
    return this.entityManager.getRepository(this.entity);
  }

  public save(payload: T) {
    return this.getRepository().save(payload);
  }

  public findOne(findOneOptions: FindOneOptions<T>) {
    return this.getRepository().findOne(findOneOptions);
  }

  public findOneBy(where: FindOptionsWhere<T>) {
    return this.getRepository().findOneBy(where);
  }

  public create(payload: T) {
    return this.getRepository().create(payload);
  }
}
