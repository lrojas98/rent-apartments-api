import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonService } from './common.service';
import { SequelizeConfigService } from './database/connection.database';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CommonService, SequelizeConfigService],
  exports: [CommonService, SequelizeConfigService],
})
export class CommonModule {}
