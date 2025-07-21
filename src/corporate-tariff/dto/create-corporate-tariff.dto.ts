import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CreateCorporateTariffDto {
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

    @IsNumber({}, { message: 'La tarifa mensual debe ser un número.' })
    @IsNotEmpty({ message: 'La tarifa mensual no puede estar vacía.' })
    @Min(0, { message: 'La tarifa mensual no puede ser negativa.' })
    monthlyRate: number;
}