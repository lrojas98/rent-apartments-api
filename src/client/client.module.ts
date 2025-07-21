import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Client } from './entities';
import { DBs } from 'src/common/interfaces';

import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [SequelizeModule.forFeature([Client], DBs.main)],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
