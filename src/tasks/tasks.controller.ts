/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status-enum';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Logger } from '@nestjs/common';
// import e from 'express';
import { TaskStatusValidation } from './pipe/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
 private logger = new Logger('TasksController')
  constructor(private tasksServices: TasksService) {}
  @Get()
  async getTasks(@Query() filterDto:GetTasksFilterDto, 
  @GetUser() user:User
  ):Promise<Task[]>{
    this.logger.verbose(`User ${user.username} retriving all the task ! Filters :${JSON.stringify(filterDto)}`)
    return this.tasksServices.getTasks(filterDto , user)
 
  }


  @Get('/:id')
  getTaskById(@Param('id') id: number , 
  @GetUser() user:User):Promise <Task> {
    return this.tasksServices.getTaskById(id , user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createtask(@Body() CreateTaskDto: CreateTaskDto , 
  @GetUser() user:User
  ):Promise <Task> {
    console.log('create task api called !')
    console.log('user in controller===?' , user)
    return this.tasksServices.createTask(CreateTaskDto , user);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') id: number):Promise <void> {
    return this.tasksServices.DelteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id' , ParseIntPipe) id: number, 
    @Body('status' , TaskStatusValidation ) status: TaskStatus ,
    @GetUser() user:User): Promise<Task> {
    return this.tasksServices.updateTask(id, status , user);
  }
}
