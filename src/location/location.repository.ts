import { Repository, EntityRepository } from 'typeorm';
import { Location } from '../entity/location.entity';
import { SaveLocationDTO } from './dto/save-location.dto';

@EntityRepository(Location)
export class LocationRepository extends Repository<Location> {
  public async saveLocation(
    saveLocationDto: SaveLocationDTO,
  ): Promise<Location> {
    const { location, timestamp } = saveLocationDto;
    const l = new Location();
    l.location = location;
    l.timestamp = timestamp;

    await l.save();
    return l;
  }
}
