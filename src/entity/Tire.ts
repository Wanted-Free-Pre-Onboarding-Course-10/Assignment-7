import { Entity, Column, ManyToOne } from "typeorm";
import { Base } from './base.entity';
import { Trim } from './Trim';
import dotenv from "dotenv";
dotenv.config();
@Entity()
export class Tire extends Base {

    @Column({ nullable: false })
    width: number;

    @Column({ nullable: false })
    aspectRatio: number;

    @Column({ nullable: false })
    wheelSize: number;

    @Column({ nullable: false })
    type: number;

    @ManyToOne(() => Trim, trim => trim, { onDelete: 'CASCADE' })
    trim: Trim;

}
