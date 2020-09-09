import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../entity/location.entity';
import { LocationRepository } from './location.repository';
import { SaveLocationDTO } from './dto/save-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationRepository)
    private locationRepository: LocationRepository,
  ) {}

  public async findAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  public async findById(id): Promise<Location> {
    return await this.locationRepository.findOne({ id: id });
  }

  public async create(saveLocationDTO: SaveLocationDTO): Promise<Location> {
    return await this.locationRepository.saveLocation(saveLocationDTO);
  }
}
