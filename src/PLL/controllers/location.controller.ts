import { Controller, Get, Res } from '@nestjs/common';
import { LocationService } from '../../DAL/services/location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

@Get('/health')
 async healthCheck(@Res() resp) : Promise<Response> {
    return resp.status(200).send("OK");
 }
}
