import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CorporateTariff } from './entities';
import { DBs } from 'src/common/interfaces';

import { CorporateTariffService } from './corporate-tariff.service';
import { CorporateTariffController } from './corporate-tariff.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([CorporateTariff], DBs.main),
  ],
  controllers: [CorporateTariffController],
  providers: [CorporateTariffService],
  exports: [CorporateTariffService],
})
export class CorporateTariffModule {}
