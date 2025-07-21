import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Apartment } from 'src/apartment/entities';
import { Client } from 'src/client/entities';
import { Payment } from 'src/payment/entities';

export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
}

@Table({
  tableName: 'reservations',
  timestamps: true,
  paranoid: true,
})
export class Reservation extends Model<Reservation> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  reservationCode: string;

  @ForeignKey(() => Apartment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  apartmentId: number;

  @BelongsTo(() => Apartment)
  apartment: Apartment;

  @ForeignKey(() => Client)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  clientId: number;

  @BelongsTo(() => Client)
  client: Client;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  endDate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(ReservationStatus)),
    allowNull: false,
    defaultValue: ReservationStatus.ACTIVE,
  })
  status: ReservationStatus;

  // Associations
  @HasMany(() => Payment)
  payments: Payment[];
}