import { Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity';
import { Tire } from './Tire';
import dotenv from "dotenv";
dotenv.config();
@Entity()
export class User extends Base {

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Tire, tire => tire.user)
    tire: Tire[];
