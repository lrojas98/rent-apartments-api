import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindAndCountOptions } from 'sequelize';

import { Apartment } from './entities';
import { ApartmentService } from './apartment.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';

import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces';
import { FilterApartmentDto } from './dto/filter-apartment.dto';

@Controller('apartment')
export class ApartmentController {
  constructor(private readonly apartmentService: ApartmentService) {}

  @Post()
  create(@Body() createApartmentDto: CreateApartmentDto) {
    return this.apartmentService.create(createApartmentDto);
  }

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
    @Query() query?: FilterApartmentDto,
  ):Promise<{ count: number; rows: Apartment[]; totalPages: number; currentPage: number; }>{
    const findOptions: FindAndCountOptions<Apartment> = {};

    findOptions.limit = pagination.limit;
    findOptions.offset = pagination.offset;

    return this.apartmentService.findAll(findOptions, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.apartmentService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentService.update(+id, updateApartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.apartmentService.remove(+id);
  }
}
