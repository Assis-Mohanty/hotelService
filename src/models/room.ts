import { Model, InferCreationAttributes, CreationOptional , InferAttributes, DataTypes } from "sequelize";
import sequelize from "./sequelize";
import RoomCategory from "./roomCategory";
import { BadRequestError } from "../utils/errors/app.error";


class Room extends Model <InferAttributes<Room>,InferCreationAttributes<Room>> {

  declare id:CreationOptional<number>
  declare hotelId : number
  declare roomCategoryId: number
  declare dateOfAvaliability: string
  declare price?:number|null
  declare createdAt:CreationOptional<Date>
  declare updatedAt:CreationOptional<Date>
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
    type:DataTypes.DATEONLY,
    allowNull:false,
  },
  price:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  bookingId:{
    type:DataTypes.INTEGER,
    allowNull:true
  },
  createdAt:{
    type:DataTypes.DATE,
    allowNull:false,
    defaultValue:DataTypes.NOW
  },
  updatedAt:{
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
Room.beforeCreate(async(room)=>{
  if(room.price==null){
    const roomCategory = await RoomCategory.findByPk(room.roomCategoryId)
    if(!roomCategory){
      throw new BadRequestError("Invalid request body")
    }
    room.price=roomCategory.price
  }
})

export default Room