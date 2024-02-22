import { AbstractEntity } from 'src/database/abstract.entity';
import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';
@Entity()
export class User extends AbstractEntity<User> {
  @Column('text')
  name: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    try {
      const salt = await genSalt();
      this.password = await hash(this.password, salt);
    } catch (error) {
      this.password = 'UNKNOWN';
    }
  }
  @Column('text')
  password: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
}
