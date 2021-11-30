/* eslint-disable prettier/prettier */
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { Repository , EntityRepository } from "typeorm";
import { AuthCredentialDto } from "./dto/auth.crediontial.dto";
import {User} from './user.entity';
// import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
async signUp(authCredentialDto : AuthCredentialDto): Promise<void>{
  const {username , password } = authCredentialDto;
  // const salt = await bcrypt.genSalt()
  const user = new User();
  user.username = username;
  user.password = password;
  try{
    await user.save();
  }catch(error){
    console.log('error code --->' , error.code)
if(error.code === '23505'){
  throw new ConflictException('Username already exist')
}
else{
  throw new InternalServerErrorException();
}
  }
}
//  private async hashPassword(){

//  }
async ValidateUserPassword(authCredentialDto:AuthCredentialDto): Promise <string>{
  const {username , password} = authCredentialDto;
  const user = await this.findOne({ username , password});
  if(user){
    return user.username;
  }else{
    return null
  }
}
}