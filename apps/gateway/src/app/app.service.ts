import { ServiceDiscoveryService } from './service-discovery.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private ServiceDiscoveryService: ServiceDiscoveryService,
    private config: ConfigService
  ) {}

  getData(): { message: string } {
    const config = this.config.get('services');
    return { message: config };
  }
}
