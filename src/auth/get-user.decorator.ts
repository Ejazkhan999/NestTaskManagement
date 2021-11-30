/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {User} from './user.entity';


export const GetUser = createParamDecorator((data, req): User =>{
  return req.user;
})