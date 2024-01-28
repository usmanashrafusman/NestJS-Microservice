import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column, Index, In } from "typeorm";


@Entity()
export class User extends AbstractEntity<User>{

    @Column("text")
    name: string

    @Column("text")
    password: string

    @Column("text")
    email: string

}