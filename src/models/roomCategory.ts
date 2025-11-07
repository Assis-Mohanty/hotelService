import { Model,InferAttributes,InferCreationAttributes,CreationOptional, DataTypes } from "sequelize";
import sequelize from "./sequelize";


export enum RoomCategoryType{
  STANDARD="STANDARD" ,
  DELUXE="DELUXE",
  LUXE="LUXE"
}

class RoomCategory extends Model<InferAttributes<RoomCategory>,InferCreationAttributes<RoomCategory>>{
  declare id: CreationOptional<number>;
  declare roomType:RoomCategoryType
  declare hotelId:number
  declare price:number
  declare createdAt:CreationOptional<Date>
  declare updatedAt:CreationOptional<Date>
  declare roomCount: number
  static associate(models: { Hotel: typeof import('./hotel').default }) {
  this.belongsTo(models.Hotel, {
    foreignKey: 'hotel_id',
    onDelete: 'CASCADE',
  });}

}

RoomCategory.init({

  id:{
    type:"INTEGER",
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },

  roomType:{
    type:DataTypes.ENUM(...Object.values(RoomCategoryType)),
    allowNull:false,
    defaultValue:RoomCategoryType.STANDARD
  },
  hotelId:{
    type:"INTEGER",
    allowNull:false,
    references:{
      model:'hotels',
      key:'id'
    }
  },
  price:{
    type:"INTEGER",
    allowNull:false,
  },
  createdAt:{
    type:DataTypes.DATE,
    defaultValue:DataTypes.NOW,
    allowNull:false
  },
  updatedAt:{
    type:DataTypes.DATE,
    allowNull:true
  },
  roomCount:{
    type:"INTEGER",
    allowNull:false
  }
  
},{
  tableName:'rooms',
  sequelize:sequelize,
  underscored:true,
  timestamps:true,
  indexes: [{
  unique: true,
  fields: ['hotel_id', 'room_number']
  }]
})



export default RoomCategory