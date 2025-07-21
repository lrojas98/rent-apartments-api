import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindAndCountOptions } from 'sequelize';

import { CorporateTariff } from './entities';
import { CorporateTariffService } from './corporate-tariff.service';
import { CreateCorporateTariffDto } from './dto/create-corporate-tariff.dto';
import { UpdateCorporateTariffDto } from './dto/update-corporate-tariff.dto';

import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces';

@Controller('corporate-tariff')
export class CorporateTariffController {
  constructor(private readonly corporateTariffService: CorporateTariffService) {}

  @Post()
  create(@Body() createCorporateTariffDto: CreateCorporateTariffDto) {
    return this.corporateTariffService.create(createCorporateTariffDto);
  }

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
  ): Promise<CorporateTariff[]> {
    const findOptions: FindAndCountOptions<CorporateTariff> = {};

    findOptions.limit = pagination.limit;
    findOptions.offset = pagination.offset;

    return this.corporateTariffService.findAll(findOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.corporateTariffService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCorporateTariffDto: UpdateCorporateTariffDto) {
    return this.corporateTariffService.update(+id, updateCorporateTariffDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.corporateTariffService.remove(+id);
  }
}
