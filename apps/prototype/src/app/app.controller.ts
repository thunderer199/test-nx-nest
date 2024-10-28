import { Body, ConflictException, Controller, Get, Head, Header, HttpCode, Post, Query } from '@nestjs/common';
import { User } from '@prototype/types';

import { HttpStatusCode } from 'axios';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  foo(data: User) {
    return 'Hello World! ' + data.name;
  }

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
