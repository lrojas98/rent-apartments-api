import { IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer'; 
import { ApartmentType } from '../entities';


export class FilterApartmentDto {
  @IsOptional()
  @IsNumber({}, { message: 'La latitud de referencia (refLatitude) debe ser un número.' })
  @Min(-90, { message: 'La latitud mínima es -90.' })
  @Max(90, { message: 'La latitud máxima es 90.' })
  @Type(() => Number)
  refLatitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'La longitud de referencia (refLongitude) debe ser un número.' })
  @Min(-180, { message: 'La longitud mínima es -180.' })
  @Max(180, { message: 'La longitud máxima es 180.' })
  @Type(() => Number)
  refLongitude?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El radio de búsqueda (radiusKm) debe ser un número en kilómetros.' })
  @Min(0, { message: 'El radio no puede ser negativo.' })
  @Type(() => Number)
  radiusKm?: number;

  @IsOptional()
  @IsEnum(ApartmentType, { message: 'El tipo de apartamento debe ser CORPORATE o TOURIST.' })
  apartmentType?: ApartmentType;

  @IsOptional()
  @IsNumber({}, { message: 'El precio mínimo debe ser un número.' })
  @Min(0, { message: 'El precio mínimo no puede ser negativo.' })
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El precio máximo debe ser un número.' })
  @Min(0, { message: 'El precio máximo no puede ser negativo.' })
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}