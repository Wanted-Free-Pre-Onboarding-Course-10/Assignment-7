import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Base } from './base.entity';
import { Trim } from "./trim";
@Entity()
export class User extends Base {

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @ManyToMany(() => Trim, trim => trim.users)
    @JoinTable()
    trims: Trim[];
}
