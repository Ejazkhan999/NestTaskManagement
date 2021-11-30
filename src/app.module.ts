/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskRepository } from './tasks/task.repository';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports:[
    TypeOrmModule.forRoot(typeOrmConfig) ,
    TypeOrmModule.forFeature([TaskRepository]),
    AuthModule
  ] , 
  controllers:[TasksController],
  providers:[TasksService]
})
export class AppModule {}
