/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions }from '@nestjs/typeorm'
import * as config from 'config';
const dbConfig = config.get('db');
export const typeOrmConfig : TypeOrmModuleOptions = {
type:'postgres',
host:'localhost',
port:dbConfig.port,
username:'postgres',
password:'qwer1234',
database:dbConfig.database,
entities: [__dirname + '/../**/*.entity.{js,ts}'] ,
synchronize:true
}
//process.env.RDS_PORT ||
//|| process.env.RDS_HOSTNAME,