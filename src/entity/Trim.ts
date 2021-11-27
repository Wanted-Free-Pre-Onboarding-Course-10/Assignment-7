import { ManyToOne, Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity'
import { Tire } from "./tire";
import { User } from './user';

@Entity()
export class Trim extends Base {

    @Column({ nullable: false })
    width: number;

    @ManyToOne(() => User, user => user.trims, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Tire, tire => tire.trim)
    tires: Tire[];
}