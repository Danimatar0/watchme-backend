import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
    test(): string {
        return 'test';
    }
}
