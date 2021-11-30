/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth.crediontial.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLaod } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtservice:JwtService
  ) {}

  async signUp(authCredentialDto: AuthCredentialDto) : Promise<void> {
    return this.userRepository.signUp(authCredentialDto);
  }
  async signIn(authCredentialDto : AuthCredentialDto):Promise <string >{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {username,password }= authCredentialDto;
    const user = await this.userRepository.ValidateUserPassword(authCredentialDto);
    if(!user) {
      throw new UnauthorizedException('Invalid credintintial')
    }

    const payload : JwtPayLaod = {username};
    const accessToken= await this.jwtservice.sign(payload);

    return accessToken;

  }
}
