import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entity/location.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  findAll(): Promise<Location[]> {
    return this.locationRepository.find();
  }

  findById(id): Promise<Location> {
    return this.locationRepository.findOne({ id: id });
  }

  create(location: Location): Promise<Location> {
    return this.locationRepository.save(location);
  }
}
