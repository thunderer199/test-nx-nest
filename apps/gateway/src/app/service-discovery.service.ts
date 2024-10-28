import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ServiceDiscoveryService {
  private serviceMap = new Map<string, string>();
  constructor(config: ConfigService) {
    config.get('services').forEach((service: { name: string; url: string }) => {
      console.log(`Service: ${service.name} URL: ${service.url}`);
      this.serviceMap.set(service.name, service.url);
    });
  }

  getServiceUrl(serviceName: string): string {
    return this.serviceMap.get(serviceName);
  }
}
