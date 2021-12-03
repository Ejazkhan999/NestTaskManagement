/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status-enum';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
    ){}

    async getTaskById(id:number , user:User): Promise<Task> {
      const found = await this.taskRepository.findOne({where:{id , userId:user.id}});
      if(!found){
            throw new NotFoundException(`Task with id ${id} not found`);
          }
          return found;
        }

    async createTask(createTaskDto:CreateTaskDto,
      user:User):Promise<Task>{
        console.log('user in service===?' , user)
     return this.taskRepository.createTask(createTaskDto , user);
    }
  // private tasks: Task[] = [];

  getTasks(filterDto:GetTasksFilterDto , 
    user:User): Promise<Task[]> {
      return this.taskRepository.getTasks(filterDto , user)
  }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
  //   const {status,search} = filterDto;
  //   let tasks = this.getAllTasks();
  //   if(status){ 
  //       tasks = tasks.filter(task => task.status === status)
  //   }
  //   if(search){
  //     tasks = tasks.filter(task=>
  //       task.title.includes(search) ||
  //       task.description.includes(search))
  //   }
  //   return tasks;
  // }
  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => (task.id = id));
  //   if(!found){
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }
  //   return found;
  // }

 async DelteTask(id: number): Promise <void> {
    const result = await this.taskRepository.delete(id);
  console.log('result ' , result)
  if(result.affected === 0){
    throw new NotFoundException(`Task with id ${id} not found or not deleted`)
  }
 
  }
  async updateTask(id:number , status:TaskStatus, 
    user:User
    ): Promise<Task> {
    const task = await this.getTaskById(id , user);
    task.status = status;
    await task.save();
    return task;
  }
  // *update Task ** //
  // updatetask(id: number, status: TaskStatus, 
  //   user:User
  //   ): Promise<Task> {
  //   const task = this.getTaskById(id, user);
  //   // task.status = status;
  //   return task;
  // }
}
