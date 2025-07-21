import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions, Op, OrderItem, ProjectionAlias, Transaction, } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { Apartment, ApartmentType } from './entities';

import { CreateApartmentDto } from './dto/create-apartment.dto';
import { UpdateApartmentDto } from './dto/update-apartment.dto';
import { CorporateTariffService } from 'src/corporate-tariff/corporate-tariff.service';
import { TouristTariffService } from 'src/tourist-tariff/tourist-tariff.service';
import { PropertyContentService } from 'src/property-content/property-content.service';
import { FilterApartmentDto } from './dto/filter-apartment.dto';
import { Sequelize } from 'sequelize-typescript';
import { CorporateTariff } from 'src/corporate-tariff/entities';
import { TouristTariff } from 'src/tourist-tariff/entities';
import { Literal } from 'sequelize/types/utils';

@Injectable()
export class ApartmentService {
  constructor(
    @InjectModel(Apartment, DBs.main)
    private apartmentModel: typeof Apartment,

    private readonly corporateTariffService: CorporateTariffService,
    private readonly touristTariffService: TouristTariffService,
    private readonly propertyContentService: PropertyContentService,
  ) { }

  async create(createApartmentDto: CreateApartmentDto) {
    // Create Transaction Sequelize
    let transaction: Transaction;
    try {
      transaction = await this.apartmentModel.sequelize.transaction();

      const { corporateTariffs, touristTariffs, propertyContent, ...apartmentData } = createApartmentDto;

      const apartment = await this.apartmentModel.create({
        ...apartmentData,
      }, { transaction });

      if (corporateTariffs && corporateTariffs.length > 0) {
        for (const tariff of corporateTariffs) {
          await this.corporateTariffService.create({ ...tariff, apartmentId: apartment.id }, transaction);
        }
      }

      if (touristTariffs && touristTariffs.length > 0) {
        for (const tariff of touristTariffs) {
          await this.touristTariffService.create({ ...tariff, apartmentId: apartment.id }, transaction);
        }
      }

      await transaction.commit();

      propertyContent ? await this.propertyContentService.create({ ...propertyContent, apartmentCode: apartment.id }) : {}

      return apartment;
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw new BadRequestException(`Error al crear el apartamento: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<Apartment>, query?: FilterApartmentDto) {
    // Logica propiedades mas cercanas
    if (query.refLatitude && query.refLongitude) {
      const refLatitude = query.refLatitude;
      const refLongitude = query.refLongitude;

      if (!Array.isArray(options.attributes)) {
        options.attributes = ['id', 'name', 'address', 'apartmentType', 'latitude', 'longitude'];
      }

      const distanceCalculation = Sequelize.literal(
        `(ST_Distance_Sphere(POINT(longitude, latitude), POINT(${refLongitude}, ${refLatitude})) / 1000)`
      );

      options.attributes.push([distanceCalculation, 'distance_km']);

      if (!options.order) {
        options.order = [[Sequelize.literal('distance_km'), 'ASC']] as OrderItem[];
      }
    }

    // Logica corporativas o turisticas
    if (query.apartmentType) {
      options.where = {
        apartmentType: query.apartmentType
      }
    }

    // Logica calculo de precios
    const today = new Date().toISOString().split('T')[0];
    options.include = []

    options.include.push({
      model: CorporateTariff,
      as: 'corporateTariffs',
      attributes: ['monthlyRate'],
      required: false,
      where: {
        startDate: { [Op.lte]: today },
        endDate: { [Op.gte]: today },
      },
    });

    options.include.push({
      model: TouristTariff,
      as: 'touristTariffs',
      attributes: ['dailyRate'],
      required: false,
      where: {
        startDate: { [Op.lte]: today },
        endDate: { [Op.gte]: today },
      },
    });

    try {
      const apartments = await this.apartmentModel.findAndCountAll(options);

      const totalPages = Math.ceil(apartments.count / (options.limit || apartments.count));
      const currentPage = options.offset && options.limit ? Math.floor(options.offset / options.limit) + 1 : 1;

      for(const apartment of apartments.rows){
        const content = await this.propertyContentService.findOne({
          where: {
            apartmentCode: apartment.id
          }
        })

        apartment.dataValues.description = content.description
        apartment.dataValues.urlImage = content.imageUrl
      }

      return {
        count: apartments.count,
        rows: apartments.rows,
        totalPages: totalPages,
        currentPage: currentPage,
      };
    } catch (error) {
      throw new BadRequestException(`Error al obtener apartamentos: ${error.message}`);
    }
  }

  async findOne(options?: FindOptions<Apartment>) {
    const { attributes, include, where } = options;

    const apartment = await this.apartmentModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return apartment;
  }

  async update(id: number, updateApartmentDto: UpdateApartmentDto): Promise<Apartment> {
    try {
      const { corporateTariffs, touristTariffs, ...apartmentData } = updateApartmentDto;

      const [affectedCount] = await this.apartmentModel.update({ ...apartmentData }, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Apartamento con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar el apartamento: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.apartmentModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Apartamento con ID ${id} no encontrado para eliminar.`);
      }

      return 'Apartamento eliminado exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar el apartamento: ${error.message}`);
    }
  }
}
