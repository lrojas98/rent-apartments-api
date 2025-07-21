import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ReservationStatus } from "../entities";

export class CreateReservationDto {
  @IsString({ message: 'El código de reserva debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El código de reserva no puede estar vacío.' })
  @Length(1, 50, { message: 'El código de reserva debe tener entre 1 y 50 caracteres.' })
  reservationCode: string;

  @IsNumber({}, { message: 'El ID del apartamento debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del apartamento no puede estar vacío.' })
  apartmentId: number;

  @IsNumber({}, { message: 'El ID del cliente debe ser un número.' })
  @IsNotEmpty({ message: 'El ID del cliente no puede estar vacío.' })
  clientId: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsEnum(ReservationStatus, { message: 'El estado de la reserva debe ser ACTIVE o CANCELLED.' })
  @IsOptional()
  status?: ReservationStatus;
}