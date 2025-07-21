import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Reservation } from './entities';
import { DBs } from 'src/common/interfaces';

import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation], DBs.main),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
