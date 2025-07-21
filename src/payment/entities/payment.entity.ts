import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Reservation } from 'src/reservation/entities';

export enum PaymentConcept {
  RENTAL = 'RENTAL',
  SERVICE_FEE = 'SERVICE_FEE'
}

@Table({
  tableName: 'payments',
  timestamps: true,
  paranoid: true,
})
export class Payment extends Model<Payment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  reservationId: number;

  @BelongsTo(() => Reservation)
  reservation: Reservation;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentConcept)),
    allowNull: false,
  })
  concept: PaymentConcept;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  paymentDate: Date;
}