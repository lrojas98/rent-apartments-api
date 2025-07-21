import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions, Transaction,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { CorporateTariff } from './entities';

import { CreateCorporateTariffDto } from './dto/create-corporate-tariff.dto';
import { UpdateCorporateTariffDto } from './dto/update-corporate-tariff.dto';

@Injectable()
export class CorporateTariffService {
  constructor(
    @InjectModel(CorporateTariff, DBs.main)
    private corporateTariffModel: typeof CorporateTariff,
  ) {}

  async create(createCorporateTariffDto: CreateCorporateTariffDto, transaction?: Transaction) {
    try {
      const corporateTariff = await this.corporateTariffModel.create({
        ...createCorporateTariffDto,
      }, { transaction });
      return corporateTariff;
    } catch (error) {
      throw new BadRequestException(`Error al crear el tarifa corporativa: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<CorporateTariff>) {
    const corporateTariffs = await this.corporateTariffModel.findAndCountAll(options);

    return corporateTariffs;
  }

  async findOne(options?: FindOptions<CorporateTariff>) {
    const { attributes, include, where } = options;

    const corporateTariff = await this.corporateTariffModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return corporateTariff;
  }

  async update(id: number, updateCorporateTariffDto: UpdateCorporateTariffDto): Promise<CorporateTariff> {
    try {
      const [affectedCount] = await this.corporateTariffModel.update(updateCorporateTariffDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Tarifa corporativa con ID ${id} no encontrado para actualizar.`);
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
      const deletedCount = await this.corporateTariffModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Tarifa corporativa con ID ${id} no encontrado para eliminar.`);
      }

      return 'Tarifa corporativa eliminada exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar la tarifa corporativa: ${error.message}`);
    }
  }
}
