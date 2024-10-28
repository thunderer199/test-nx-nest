import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceDiscoveryService } from './service-discovery.service';
import config from './config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServiceDiscoveryService],
})
export class AppModule {}
