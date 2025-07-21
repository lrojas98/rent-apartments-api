import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { PropertyContent } from './entities';
import { DBs } from 'src/common/interfaces';

import { PropertyContentService } from './property-content.service';
import { PropertyContentController } from './property-content.controller';

@Module({
  imports: [SequelizeModule.forFeature([PropertyContent],DBs.content)],
  controllers: [PropertyContentController],
  providers: [PropertyContentService],
  exports: [PropertyContentService],
})
export class PropertyContentModule {}
