import { Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity';
import dotenv from "dotenv";
import { Trim } from "./Trim";
dotenv.config();
@Entity()
export class User extends Base {

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Trim, trim => trim.user)
    tire: Trim[];
}
