/* eslint-disable prettier/prettier */
import { createParamDecorator ,  ExecutionContext } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import {User} from './user.entity';



export const GetUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});