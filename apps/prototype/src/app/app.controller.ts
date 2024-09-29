import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    console.log('Request ->');
    return this.appService.getData();
  }

  @Get('me')
  getMe() {
    console.log('Request -> me');
    return {'me': 'John Doe'};
  }

  @Get('service1')
  getS() {
    console.log('Request -> me service 1');
    return {'me': 'John Doe'};
  }
}
