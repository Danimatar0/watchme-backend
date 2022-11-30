import { Module } from '@nestjs/common';
import { LocationService } from './DAL/services/location.service';
import { LocationController } from './PLL/controllers/location.controller';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule {}
