import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location } from '../entity/location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
