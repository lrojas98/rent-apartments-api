import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { TouristTariff } from './entities';
import { DBs } from 'src/common/interfaces';

import { TouristTariffService } from './tourist-tariff.service';
import { TouristTariffController } from './tourist-tariff.controller';

@Module({
  imports: [SequelizeModule.forFeature([TouristTariff], DBs.main)],
  controllers: [TouristTariffController],
  providers: [TouristTariffService],
  exports: [TouristTariffService],
})
export class TouristTariffModule {}
