import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from './base.entity';
import { User } from './User';
import dotenv from "dotenv";
dotenv.config();
@Entity()
export class Tire extends Base {

    @Column({ unique: true })
    trimId: number;

    @Column({ nullable: false })
    frontWidth: number;

    @Column({ nullable: false })
    frontAspectRatio: number;

    @Column({ nullable: false })
    frontWheelSize: number;

    @Column({ nullable: false })
    rearWidth: number;

    @Column({ nullable: false })
    rearAspectRatio: number;

    @Column({ nullable: false })
    rearWheelSize: number;

    @ManyToOne(() => User, user => user.tire, { onDelete: 'CASCADE' })
    user: User;
}
