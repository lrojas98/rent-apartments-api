import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Apartment } from './entities';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';

import { CorporateTariffModule } from 'src/corporate-tariff/corporate-tariff.module';
import { TouristTariffModule } from 'src/tourist-tariff/tourist-tariff.module';
import { PropertyContentModule } from 'src/property-content/property-content.module';

import { DBs } from 'src/common/interfaces';

@Module({
  imports: [
    SequelizeModule.forFeature([Apartment], DBs.main),

    CorporateTariffModule,
    TouristTariffModule,
    PropertyContentModule,
  ],
  controllers: [ApartmentController],
  providers: [ApartmentService],
  exports: [ApartmentService],
})
export class ApartmentModule {}
