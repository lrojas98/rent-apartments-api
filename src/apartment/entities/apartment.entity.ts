import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { CorporateTariff } from 'src/corporate-tariff/entities';
import { Reservation } from 'src/reservation/entities';
import { TouristTariff } from 'src/tourist-tariff/entities';

export enum ApartmentType {
  CORPORATE = 'CORPORATE',
  TOURIST = 'TOURIST',
}

export enum ApartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Table({
  tableName: 'apartments',
  timestamps: true,
  paranoid: true,
})
export class Apartment extends Model<Apartment> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM(...Object.values(ApartmentType)),
    allowNull: false,
  })
  apartmentType: ApartmentType;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  city: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  country: string;

  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false,
  })
  latitude: number;

  @Column({
    type: DataType.DECIMAL(10, 7),
    allowNull: false,
  })
  longitude: number;

  @Column({
    type: DataType.ENUM(...Object.values(ApartmentStatus)),
    allowNull: false,
    defaultValue: ApartmentStatus.ACTIVE,
  })
  status: ApartmentStatus;

  // Associations
  @HasMany(() => CorporateTariff)
  corporateTariffs: CorporateTariff[];

  @HasMany(() => TouristTariff)
  touristTariffs: TouristTariff[];

  @HasMany(() => Reservation)
  reservations: Reservation[];

  description: string;
  urlImage: string;
}