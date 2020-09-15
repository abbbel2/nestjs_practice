import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../entity/location.entity';

@Controller('/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/all')
  async findAll(): Promise<any> {
    return this.locationService.findAll();
  }

  @Get('/search')
  async search(@Query() query): Promise<any> {
    const data = this.locationService.findAll();
    const result = [];
    (await data).forEach(function(d) {
      if (d.timestamp.split(' ')[0] === query.date) {
        result.push(d);
      }
    });
    return result;
  }

  @Get('/:id')
  async findOne(@Param('id') id): Promise<any> {
    return this.locationService.findById(id);
  }

  @Post('/save')
  async save(@Body() body: Location): Promise<any> {
    const res = await this.locationService.create(body);
    return res;
  }
}
