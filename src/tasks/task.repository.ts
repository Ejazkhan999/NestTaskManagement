/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Task } from './task.entity'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from "./task-status-enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { AuthCredentialDto } from "src/auth/dto/auth.crediontial.dto";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TaskRepository extends Repository <Task> {
  private logger = new Logger('TaskRepository');

  async createTask(createTaskDto:CreateTaskDto ,
    user:User):Promise<Task>{
    console.log('task function called !')
    const { title , description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    console.log('user is --->' , user)
    task.user = user;
    console.log('task is --->' , task)
    await task.save();
    delete task.user;
    return task;
  }

  async getTasks(filterDto:GetTasksFilterDto , 
    user:User
    ): Promise<Task[]> {
     
    const {status , search } = filterDto;
    
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId' , {userId:user.id})
    if(status){
      query.andWhere('task.status = :status' , {status})
    }
    if(search){
      query.andWhere('(task.title LIKE :search OR task.description LIKE :search)' , {search : `%${search}%`})
    }
    try{
      const tasks = await query.getMany();
      return tasks;

    }catch(error){
      this.logger.error('task not loaded ')
throw new InternalServerErrorException();
    }
  
  }


}