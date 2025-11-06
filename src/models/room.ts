import { Model,InferAttributes,InferCreationAttributes,CreationOptional, DataTypes } from "sequelize";
import sequelize from "./sequelize";


export enum RoomType{
  STANDARD="STANDARD",
  DELUXE="DELUXE",
  LUXE="LUXE"
}

class Room extends Model<InferAttributes<Room>,InferCreationAttributes<Room>>{
  declare id: CreationOptional<number>;
  declare roomNumber:number
  declare roomType:RoomType
  declare hotelId:number
  declare price:number
  declare createdAt:CreationOptional<Date>
  declare updatedAt:CreationOptional<Date>
  static associate(models: { Hotel: typeof import('./hotel').default }) {
  this.belongsTo(models.Hotel, {
    foreignKey: 'hotel_id',
    onDelete: 'CASCADE',
  });}

}

Room.init({

  id:{
    type:"INTEGER",
    autoIncrement:true,
    primaryKey:true,
    allowNull:false
  },
  roomNumber:{
    type:"INTEGER",
    allowNull:false,
  },
  roomType:{
    type:DataTypes.ENUM(...Object.values(RoomType)),
    allowNull:false,
    defaultValue:RoomType.STANDARD
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



export default Room