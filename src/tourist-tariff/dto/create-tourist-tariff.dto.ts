import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateTouristTariffDto {
  @IsOptional()
  @IsNumber({}, { message: 'El ID del apartamento debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del apartamento no puede estar vacío.' })
  apartmentId?: number;

  @Type(() => Date) 
  @IsDate()
  startDate: Date;

  @Type(() => Date) 
  @IsDate()
  endDate: Date;

  @IsNumber({}, { message: 'La tarifa diaria debe ser un número.' })
  @IsNotEmpty({ message: 'La tarifa diaria no puede estar vacía.' })
  @Min(0, { message: 'La tarifa diaria no puede ser negativa.' })
  dailyRate: number;
}