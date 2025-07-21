import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, Length } from "class-validator";

export class CreatePropertyContentDto {
  @IsOptional()
  @IsNumber({}, { message: 'El código de apartamento debe ser un número.' })
  @IsNotEmpty({ message: 'El código de apartamento no puede estar vacío.' })
  apartmentCode?: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Length(1, 1000, { message: 'La descripción debe tener entre 1 y 1000 caracteres.' })
  description: string;

  @IsUrl({}, { message: 'La URL de la imagen debe ser una URL válida.' })
  imageUrl: string;
}