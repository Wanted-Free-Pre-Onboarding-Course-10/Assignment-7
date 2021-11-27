import { ManyToOne, Entity, Column, OneToMany } from "typeorm";
import { Base } from './base.entity'
import { Tire } from "./Tire";
import { User } from './User';

@Entity()
export class Trim extends Base {

    @Column({ nullable: false })
    width: number;

    @ManyToOne(() => User, user => user.tire, { onDelete: 'CASCADE' })
    user: User;

    @OneToMany(() => Tire, tire => tire.trim, { onDelete: 'CASCADE' })
    tire: Tire[];
}