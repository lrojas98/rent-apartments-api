import { PartialType } from '@nestjs/mapped-types';
import { CreateCorporateTariffDto } from './create-corporate-tariff.dto';

export class UpdateCorporateTariffDto extends PartialType(CreateCorporateTariffDto) {}
