import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, Min, Max, IsArray, ValidateNested, IsObject } from 'class-validator';
import { ApartmentStatus, ApartmentType } from '../entities/apartment.entity';
import { Type } from 'class-transformer';
import { CreateCorporateTariffDto } from 'src/corporate-tariff/dto/create-corporate-tariff.dto';
import { CreateTouristTariffDto } from 'src/tourist-tariff/dto/create-tourist-tariff.dto';
import { CreatePropertyContentDto } from 'src/property-content/dto/create-property-content.dto';

export class CreateApartmentDto {
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
    name: string;

    @IsString({ message: 'La dirección debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La dirección no puede estar vacío.' })
    address: string;

    @IsEnum(ApartmentType, { message: 'El tipo de apartamento debe ser CORPORATE o TOURIST.' })
    @IsNotEmpty({ message: 'El tipo de apartamento no puede estar vacío.' })
    apartmentType: ApartmentType;

    @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'La ciudad no puede estar vacío.' })
    city: string;

    @IsString({ message: 'El país debe ser una cadena de texto.' })
    @IsNotEmpty({ message: 'El país no puede estar vacío.' })
    country: string;

    @IsNumber({}, { message: 'La latitud debe ser un número.' })
    @Min(-90, { message: 'La latitud mínima es -90.' })
    @Max(90, { message: 'La latitud máxima es 90.' })
    latitude: number;

    @IsNumber({}, { message: 'La longitud debe ser un número.' })
    @Min(-180, { message: 'La longitud mínima es -180.' })
    @Max(180, { message: 'La longitud máxima es 180.' })
    longitude: number;

    @IsEnum(ApartmentStatus, { message: 'El estado debe ser ACTIVE o INACTIVE.' })
    @IsOptional()
    status?: ApartmentStatus;

    @IsOptional()
    @IsArray({ message: 'Las tarifas corporativas deben ser un array.' })
    @ValidateNested({ each: true })
    @Type(() => CreateCorporateTariffDto)
    corporateTariffs?: CreateCorporateTariffDto[];

    @IsOptional()
    @IsArray({ message: 'Las tarifas turísticas deben ser un array.' })
    @ValidateNested({ each: true })
    @Type(() => CreateTouristTariffDto)
    touristTariffs?: CreateTouristTariffDto[];

    @IsOptional()
    @IsObject({ message: 'Las tarifas turísticas deben ser un objeto.' })
    @ValidateNested()
    @Type(() => CreatePropertyContentDto)
    propertyContent?: CreatePropertyContentDto;
}