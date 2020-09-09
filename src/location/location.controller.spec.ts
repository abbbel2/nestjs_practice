import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entity/location.entity';

describe('LocationService', () => {
  let locationController: LocationController;
  let locationService: LocationService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [LocationService],
    }).compile();

    locationService = await moduleRef.resolve(LocationService);
    locationController = await moduleRef.resolve(LocationController);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(locationService, 'findAll').mockImplementation(() => result);

      expect(await locationController.findAll()).toBe(result);
    });
  });
});
