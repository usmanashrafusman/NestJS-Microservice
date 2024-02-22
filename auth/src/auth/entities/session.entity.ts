import { AbstractEntity } from "src/database/abstract.entity";
import { Entity, Column } from "typeorm";


@Entity()
export class Session extends AbstractEntity<Session>{

    @Column("text")
    token: string

    @Column("text")
    secret: string

}