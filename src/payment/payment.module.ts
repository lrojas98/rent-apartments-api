import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Payment } from './entities';
import { DBs } from 'src/common/interfaces';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Payment], DBs.main),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
