/* eslint-disable prettier/prettier */
import { Module , Global} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from "./task.repository";
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {AuthModule} from '../auth/auth.module'
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ] ,
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {
  
}
