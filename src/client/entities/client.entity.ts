import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { Reservation } from 'src/reservation/entities';

@Table({
  tableName: 'clients',
  timestamps: true,
  paranoid: true,
})
export class Client extends Model<Client> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email: string;

  // Associations
  @HasMany(() => Reservation)
  reservations: Reservation[];
}