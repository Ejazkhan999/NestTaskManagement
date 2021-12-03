/* eslint-disable prettier/prettier */
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status-enum";
import {User} from '../auth/user.entity';

@Entity()
export class Task extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string

  @Column()
  description:string

  @Column()
  status:TaskStatus
  @ManyToOne(type => User, user => user.tasks , {eager:false})
  // nullable:false
  user: User;
 
  @Column()
  userId:number
  nullable:false

}