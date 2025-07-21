import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import ValidationSchema from './common/config/joi.config';
import envConfig from './common/config/app.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { SequelizeConfigService } from './common/database/connection.database';
import { DBs } from './common/interfaces';
import { ApartmentModule } from './apartment/apartment.module';
import { CorporateTariffModule } from './corporate-tariff/corporate-tariff.module';
import { TouristTariffModule } from './tourist-tariff/tourist-tariff.module';
import { ClientModule } from './client/client.module';
import { ReservationModule } from './reservation/reservation.module';
import { PaymentModule } from './payment/payment.module';
import { PropertyContentModule } from './property-content/property-content.module';
import { APP_INTERCEPTOR, Reflector } from '@nestjs/core';
import { ResponseInterceptor } from './core/response.interceptor';

@Module({
  imports: [

    // Config Environment Variables
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: ValidationSchema,
      isGlobal: true,
    }),

    // Connection to the databases
    SequelizeModule.forRootAsync({
      imports: [CommonModule],
      useClass: SequelizeConfigService,
      name: DBs.main,
    }),

    SequelizeModule.forRootAsync({
      imports: [CommonModule],
      useClass: SequelizeConfigService,
      name: DBs.content,
    }),

    CommonModule,
    ApartmentModule,
    CorporateTariffModule,
    TouristTariffModule,
    ClientModule,
    ReservationModule,
    PaymentModule,
    PropertyContentModule
  ],
  controllers: [AppController],
  providers: [{
      provide: APP_INTERCEPTOR,
      useFactory: (reflector: Reflector) => new ResponseInterceptor(reflector),
      inject: [Reflector],
    },AppService],
})
export class AppModule {}
