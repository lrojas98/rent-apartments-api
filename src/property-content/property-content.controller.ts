import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindAndCountOptions } from 'sequelize';

import { PropertyContent } from './entities';
import { PropertyContentService } from './property-content.service';
import { CreatePropertyContentDto } from './dto/create-property-content.dto';
import { UpdatePropertyContentDto } from './dto/update-property-content.dto';

import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces';

@Controller('property-content')
export class PropertyContentController {
  constructor(private readonly propertyContentService: PropertyContentService) {}

  @Post()
  create(@Body() createPropertyContentDto: CreatePropertyContentDto) {
    return this.propertyContentService.create(createPropertyContentDto);
  }

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
  ): Promise<PropertyContent[]> {
    const findOptions: FindAndCountOptions<PropertyContent> = {};

    findOptions.limit = pagination.limit;
    findOptions.offset = pagination.offset;

    return this.propertyContentService.findAll(findOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertyContentService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyContentDto: UpdatePropertyContentDto) {
    return this.propertyContentService.update(+id, updatePropertyContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertyContentService.remove(+id);
  }
}
