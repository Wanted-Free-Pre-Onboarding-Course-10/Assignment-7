import { ManyToMany, Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity'
import { Tire } from "./tire";
import { User } from './user';

@Entity()
export class Trim extends Base {

    @Column({ nullable: false })
    width: number;

    @ManyToMany(() => User, user => user.trims)
    users: User[];

    @OneToMany(() => Tire, tire => tire.trim)
    tires: Tire[];
}