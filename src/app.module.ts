import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { LocationModule } from './location/location.module';
import { Location } from './entity/location.entity';

@Module({
  imports: [
    LocationModule,
    //  TypeOrmModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'location',
      entities: [Location],
      synchronize: true,
    }),
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
