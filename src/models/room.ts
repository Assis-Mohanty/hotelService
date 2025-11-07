import { Model, InferCreationAttributes, CreationOptional , InferAttributes, DataTypes } from "sequelize";
import sequelize from "./sequelize";


class Room extends Model <InferAttributes<Room>,InferCreationAttributes<Room>> {

  declare id:CreationOptional<number>
  declare hotelId : number
  declare roomCategoryId: number
  declare dateOfAvaliability: Date
  declare price:number
  declare createdAt:CreationOptional<Date>
  declare updateAt:CreationOptional<Date>
  declare deletedAt:CreationOptional<Date>
  declare bookingId?:number | null

}

Room.init({
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },
  hotelId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  roomCategoryId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  dateOfAvaliability:{
    type:DataTypes.DATE,
    allowNull:false,
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  createdAt:{
    type:DataTypes.DATE,
    allowNull:false,
    defaultValue:DataTypes.NOW
  },
  updateAt:{
    type:DataTypes.DATE,
    allowNull:true,
  },
  deletedAt:{
    type:DataTypes.DATE,
    allowNull:true,
  }
},{
  tableName:'rooms',
  sequelize:sequelize,
  paranoid:true,
  underscored:true
})

export default Room