import { Test, TestingModule } from '@nestjs/testing';
import { LocationService } from './location.service';
import { LocationRepository } from './location.repository';
import { NotFoundException } from '@nestjs/common';

describe('Location Service', () => {
  let locationService;
  let locationRepository;
  const mockLocationRepository = () => ({
    saveLocation: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: LocationRepository,
          useFactory: mockLocationRepository,
        },
      ],
    }).compile();

    locationService = module.get<LocationService>(LocationService);
    locationRepository = await module.get<LocationRepository>(
      LocationRepository,
    );
  });

  describe('getLocations', () => {
    it('Should return array of location', async () => {
      locationRepository.find.mockResolvedValue('locations');
      expect(locationRepository.find).not.toHaveBeenCalled();
      const result = await locationService.findAll();
      expect(locationRepository.find).toHaveBeenCalled();
      expect(result).toEqual('locations');
    });
  });

  describe('saveLocation', () => {
    it('Should save location', async () => {
      locationRepository.saveLocation.mockResolvedValue('saved location');
      expect(locationRepository.saveLocation).not.toHaveBeenCalled();
      const saveLocationDTO = {
        location: 'test',
        timestamp: 'test timestamp',
      };
      const result = await locationService.create(saveLocationDTO);
      expect(locationRepository.saveLocation).toHaveBeenCalledWith(
        saveLocationDTO,
      );
      expect(result).toEqual('saved location');
    });
  });

  describe('getLocation', () => {
    it('Should return single location', async () => {
      const mockLocation = {
        id: 1,
        location: 'test',
        timestamp: 'test',
        created_at: 'test',
      };
      locationRepository.findOne.mockResolvedValue(mockLocation);
      const result = await locationService.findById(1);
      expect(result).toEqual(mockLocation);
      expect(locationRepository.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('throws an error as a location is not found', () => {
      locationRepository.findOne.mockResolvedValue(null);
      expect(locationService.findById(1)).rejects.toThrow(NotFoundException);
    });
  });
});
