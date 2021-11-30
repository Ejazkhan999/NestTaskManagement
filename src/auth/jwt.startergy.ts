/* eslint-disable prettier/prettier */
import {PassportStrategy} from '@nestjs/passport';
import {Strategy , ExtractJwt} from 'passport-jwt';
import {Injectable , UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserRepository} from './user.repository';
import {JwtPayLaod} from './jwt-payload.interface';
import {User} from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository:UserRepository,

  ){
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:'topsecret',
    })
  }
  async validate(payload: JwtPayLaod):Promise<User> {
    const {username} = payload;
    const user = await this.userRepository.findOne({username})
    if(!user){
      throw new UnauthorizedException()
    }
    return user;
  }

}