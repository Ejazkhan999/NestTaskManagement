/* eslint-disable prettier/prettier */
import { IsString, MaxLength, MinLength } from 'class-validator';

/* eslint-disable prettier/prettier */
export class AuthCredentialDto {

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username:string;
  // eslint-disable-next-line prettier/prettier

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password:string;

}