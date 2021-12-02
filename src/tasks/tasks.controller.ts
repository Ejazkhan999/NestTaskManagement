/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import {  TaskStatus } from './task-status-enum';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
// import e from 'express';
import { TaskStatusValidation } from './pipe/task-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';


@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksServices: TasksService) {}
  @Get()
  async getTasks(@Query() filterDto:GetTasksFilterDto):Promise<Task[]>{
    return this.tasksServices.getTasks(filterDto)
 
  }


  @Get('/:id')
  getTaskById(@Param('id') id: number):Promise <Task> {
    return this.tasksServices.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createtask(@Body() CreateTaskDto: CreateTaskDto):Promise <Task> {
    console.log('create task api called !')
    return this.tasksServices.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  DeleteTask(@Param('id') id: number):Promise <void> {
    return this.tasksServices.DelteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id' , ParseIntPipe) id: number, 
    @Body('status' , TaskStatusValidation ) status: TaskStatus): Promise<Task> {
    return this.tasksServices.updateTask(id, status);
  }
}
