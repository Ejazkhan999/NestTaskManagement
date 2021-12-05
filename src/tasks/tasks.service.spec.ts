/* eslint-disable prettier/prettier */
import { Test } from '@nestjs/testing'
import {TasksService} from './tasks.service';
import { TaskRepository} from './task.repository';

const mockTaskRepository = ()=>({
  getTasks:jest.fn()
});

describe('TasksService' , ()=>{

  let tasksService;
  let taskRepository;

  beforeEach(async ()=>{
    const module = await Test.createTestingModule({
      providers:[
        TasksService ,
        {provide:TaskRepository , useFactory:mockTaskRepository }
      ]
    }).compile();
    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository)
  })
  describe('getTasks' , ()=>{
    it('get all task from Repository !' , ()=>{
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
  
    })
  })




})

