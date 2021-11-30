/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth.crediontial.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService:AuthService,
  ){}
@Post('/signup')
signUp(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise <void>{
  console.log(authCredentialDto)
  return this.authService.signUp(authCredentialDto)
   
}

@Post('/SignIn')
signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<  string>{
  console.log('siggn in api called !')
  return this.authService.signIn(authCredentialDto)
}

@Post('/test')
@UseGuards(AuthGuard())
test(@GetUser() user: User) {
  console.log('request --->' , user)
}

}

