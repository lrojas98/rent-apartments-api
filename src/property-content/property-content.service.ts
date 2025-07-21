import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { PropertyContent } from './entities';

import { CreatePropertyContentDto } from './dto/create-property-content.dto';
import { UpdatePropertyContentDto } from './dto/update-property-content.dto';

@Injectable()
export class PropertyContentService {
  constructor(
    @InjectModel(PropertyContent, DBs.content)
    private propertyContentModel: typeof PropertyContent,
  ) {}

  async create(createPropertyContentDto: CreatePropertyContentDto) {
    try {
      const content = await this.propertyContentModel.create({
        ...createPropertyContentDto,
      });
      return content;
    } catch (error) {
      throw new BadRequestException(`Error al crear el contenido: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<PropertyContent>) {
    const { attributes, include, where } = options;

    const content = await this.propertyContentModel.findAll({
      attributes: attributes,
      include: include,
      where: where,
    });

    return content;
  }

  async findOne(options?: FindOptions<PropertyContent>) {
    const { attributes, include, where } = options;

    const content = await this.propertyContentModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return content;
  }

  async update(id: number, updatePropertyContentDto: UpdatePropertyContentDto): Promise<PropertyContent> {
    try {
      const [affectedCount] = await this.propertyContentModel.update(updatePropertyContentDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Contenido con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar el contenido: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.propertyContentModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Contenido con ID ${id} no encontrado para eliminar.`);
      }

      return 'Contenido eliminado exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar el contenido: ${error.message}`);
    }
  }
}
