import { Injectable } from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAndCountOptions, FindOptions,} from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

import { DBs } from 'src/common/interfaces';
import { Payment } from './entities';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment, DBs.main)
    private paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const payment = await this.paymentModel.create({
        ...createPaymentDto,
      });
      return payment;
    } catch (error) {
      throw new BadRequestException(`Error al crear el pago: ${error.message}`);
    }
  }

  async findAll(options?: FindAndCountOptions<Payment>) {
    const { attributes, include, where } = options;

    const payments = await this.paymentModel.findAll({
      attributes: attributes,
      include: include,
      where: where,
    });

    return payments;
  }

  async findOne(options?: FindOptions<Payment>) {
    const payment = await this.paymentModel.findOne(options);

    return payment;
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    try {
      const [affectedCount] = await this.paymentModel.update(updatePaymentDto, {
        where: { id },
      });

      if (affectedCount == 0) {
        throw new NotFoundException(`Pago con ID ${id} no encontrado para actualizar.`);
      }

      return this.findOne({ where: { id } });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar el pago: ${error.message}`);
    }
  }

  async remove(id: number): Promise<String> {
    try {
      const deletedCount = await this.paymentModel.destroy({ where: { id } });

      if (deletedCount === 0) {
        throw new NotFoundException(`Pago con ID ${id} no encontrado para eliminar.`);
      }

      return 'Pago eliminado exitosamente';
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al eliminar el pago: ${error.message}`);
    }
  }
}
