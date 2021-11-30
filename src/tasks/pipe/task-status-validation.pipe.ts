/* eslint-disable prettier/prettier */
import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from '../task-status-enum';

export class TaskStatusValidation implements PipeTransform{
  readonly allowedStatuses = [
     TaskStatus.OPEN,
     TaskStatus.IN_PROGRESS,
     TaskStatus.DONE
  ]
  
  transform(value:any , metadata: ArgumentMetadata){
    if(!this.IsStatusValid(value)){
      throw new BadRequestException(`${value} is $Invalud status !`)
    }
    return value
    console.log('value --->' , value)
    console.log('meta data========?' , metadata)
  }
  private IsStatusValid(status:any){
  const idx = this.allowedStatuses.indexOf(status);
  return idx !== -1;

  }
}