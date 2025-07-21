import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions, Transaction,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { TouristTariff } from './entities';

import { CreateTouristTariffDto } from './dto/create-tourist-tariff.dto';
import { UpdateTouristTariffDto } from './dto/update-tourist-tariff.dto';

@Injectable()
export class TouristTariffService {
  constructor(
    @InjectModel(TouristTariff, DBs.main)
    private touristTariffModel: typeof TouristTariff,
  ) {}

  async create(createTouristTariffDto: CreateTouristTariffDto, transaction?: Transaction) {
    try {
      const touristTariff = await this.touristTariffModel.create({
        ...createTouristTariffDto,
      }, { transaction });
      return touristTariff;
    } catch (error) {
      throw new BadRequestException(`Error al crear el tarifa turística: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<TouristTariff>) {
    const { attributes, include, where } = options;

    const touristTariffs = await this.touristTariffModel.findAll({
      attributes: attributes,
      include: include,
      where: where,
    });

    return touristTariffs;
  }

  async findOne(options?: FindOptions<TouristTariff>) {
    const { attributes, include, where } = options;

    const touristTariff = await this.touristTariffModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return touristTariff;
  }

  async update(id: number, updateTouristTariffDto: UpdateTouristTariffDto): Promise<TouristTariff> {
    try {
      const [affectedCount] = await this.touristTariffModel.update(updateTouristTariffDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Tarifa turística con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar la tarifa turística: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.touristTariffModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Tarifa turística con ID ${id} no encontrado para eliminar.`);
      }

      return 'Tarifa turística eliminada exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar la tarifa turística: ${error.message}`);
    }
  }
}
