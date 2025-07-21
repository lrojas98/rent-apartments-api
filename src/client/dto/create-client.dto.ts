import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateClientDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @Length(1, 100, { message: 'El nombre debe tener entre 1 y 100 caracteres.' })
  firstName: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacío.' })
  @Length(1, 100, { message: 'El apellido debe tener entre 1 y 100 caracteres.' })
  lastName: string;

  @IsEmail({}, { message: 'El email debe ser una dirección de correo electrónico válida.' })
  @IsNotEmpty({ message: 'El email no puede estar vacío.' })
  @Length(1, 100, { message: 'El email debe tener entre 1 y 100 caracteres.' })
  email: string;
}
