import { Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity';
import { Trim } from "./trim";
@Entity()
export class User extends Base {

    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Trim, trim => trim.user)
    trims: Trim[];
}
