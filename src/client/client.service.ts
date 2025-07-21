import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { Client } from './entities';

import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client, DBs.main)
    private clientModel: typeof Client,
  ) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientModel.create({
        ...createClientDto,
      });
      return client;
    } catch (error) {
      throw new BadRequestException(`Error al crear el cliente: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<Client>) {
    const clients = await this.clientModel.findAll(options);

    return clients;
  }

  async findOne(options?: FindOptions<Client>) {
    const { attributes, include, where } = options;

    const client = await this.clientModel.findOne({
      attributes: attributes,
      include: include,
      where: where,
    });

    return client;
  }

  async update(id: number, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      const [affectedCount] = await this.clientModel.update(updateClientDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar el cliente: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.clientModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Cliente con ID ${id} no encontrado para eliminar.`);
      }

      return 'Cliente eliminado exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar el cliente: ${error.message}`);
    }
  }
}
