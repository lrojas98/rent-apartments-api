import { PartialType } from '@nestjs/mapped-types';
import { CreateTouristTariffDto } from './create-tourist-tariff.dto';

export class UpdateTouristTariffDto extends PartialType(CreateTouristTariffDto) {}
