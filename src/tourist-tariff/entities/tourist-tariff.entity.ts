import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Apartment } from 'src/apartment/entities';

@Table({
  tableName: 'tourist_tariffs',
  timestamps: true,
  paranoid: true,
})
export class TouristTariff extends Model<TouristTariff> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => Apartment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  apartmentId: number;

  @BelongsTo(() => Apartment)
  apartment: Apartment;

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
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  dailyRate: number;
}