import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { Reservation } from './entities';

import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation, DBs.main)
    private reservationModel: typeof Reservation,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    try {
      const reservation = await this.reservationModel.create({
        ...createReservationDto,
      });
      return reservation;
    } catch (error) {
      throw new BadRequestException(`Error al crear la reserva: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<Reservation>) {
    const { attributes, include, where } = options;

    const reservations = await this.reservationModel.findAll({
      attributes: attributes,
      include: include,
      where: where,
    });

    return reservations;
  }

  async findOne(options?: FindOptions<Reservation>) {
    const { attributes, include, where } = options;

    const reservation = await this.reservationModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    try {
      const [affectedCount] = await this.reservationModel.update(updateReservationDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Reserva con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar la tarifa corporativa: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.reservationModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Reserva con ID ${id} no encontrado para eliminar.`);
      }

      return 'Reserva eliminada exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar la reserva: ${error.message}`);
    }
  }
}
