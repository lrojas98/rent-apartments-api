import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindAndCountOptions } from 'sequelize';

import { TouristTariff } from './entities';
import { TouristTariffService } from './tourist-tariff.service';

import { CreateTouristTariffDto } from './dto/create-tourist-tariff.dto';
import { UpdateTouristTariffDto } from './dto/update-tourist-tariff.dto';

import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces';

@Controller('tourist-tariff')
export class TouristTariffController {
  constructor(private readonly touristTariffService: TouristTariffService) {}

  @Post()
  create(@Body() createTouristTariffDto: CreateTouristTariffDto) {
    return this.touristTariffService.create(createTouristTariffDto);
  }

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
  ): Promise<TouristTariff[]> {
    const findOptions: FindAndCountOptions<TouristTariff> = {};

    findOptions.limit = pagination.limit;
    findOptions.offset = pagination.offset;

    return this.touristTariffService.findAll(findOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.touristTariffService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristTariffDto: UpdateTouristTariffDto) {
    return this.touristTariffService.update(+id, updateTouristTariffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.touristTariffService.remove(+id);
  }
}
