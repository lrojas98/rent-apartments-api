import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Unique } from 'sequelize-typescript';

@Table({
  tableName: 'property_content',
  timestamps: true,
  paranoid: true,
})
export class PropertyContent extends Model<PropertyContent> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id: number;

  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  apartmentCode: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  imageUrl: string;
}