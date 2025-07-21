import { IsDate, IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { PaymentConcept } from "../entities";

export class CreatePaymentDto {
  @IsNumber({}, { message: 'El ID de la reserva debe ser un número.' })
  @IsNotEmpty({ message: 'El ID de la reserva no puede estar vacío.' })
  reservationId: number;

  @IsEnum(PaymentConcept, { message: 'El concepto de pago debe ser RENTAL o SERVICE_FEE.' })
  @IsNotEmpty({ message: 'El concepto de pago no puede estar vacío.' })
  concept: PaymentConcept;

  @IsNumber({}, { message: 'El monto debe ser un número.' })
  @IsNotEmpty({ message: 'El monto no puede estar vacío.' })
  @Min(0, { message: 'El monto no puede ser negativo.' })
  amount: number;

  @IsDate()
  paymentDate: Date;
}