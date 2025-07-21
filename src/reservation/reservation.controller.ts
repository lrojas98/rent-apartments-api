import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FindAndCountOptions } from 'sequelize';

import { Reservation } from './entities';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { IPagination } from 'src/common/interfaces';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationService.create(createReservationDto);
  }

  @Get()
  findAll(
    @Query(PaginationPipe) pagination: IPagination,
  ): Promise<Reservation[]> {
    const findOptions: FindAndCountOptions<Reservation> = {};

    findOptions.limit = pagination.limit;
    findOptions.offset = pagination.offset;

    return this.reservationService.findAll(findOptions);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationService.findOne({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
