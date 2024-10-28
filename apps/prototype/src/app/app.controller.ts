import { Body, ConflictException, Controller, Get, Head, Header, HttpCode, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';
import { HttpStatusCode } from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('x-custom-header', 'uryybjbeyq')
  @HttpCode(HttpStatusCode.Accepted)
  getData() {
    return this.appService.getData();
  }

  @Get('me')
  getMe() {
    return {'me': 'John Doe'};
  }

  @Get('service1')
  getS() {
    throw new ConflictException('Service 1 is not available');
    return {'me': 'John Doe'};
  }

  @Post('form')
  getForm(
    @Body() body,
    @Query() query,
  ) {
    return {
      'me': 'John Doe',
      body,
      query,
    };
  }
}
