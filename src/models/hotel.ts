import {Model,InferAttributes,InferCreationAttributes, CreationOptional, ENUM} from 'sequelize'
import sequelize from './sequelize';


enum roomType{
    "STANDARD",
    "DELUXE",
    "SUITE",
    "EXECUTIVE"
}



class Hotel extends Model<InferAttributes<Hotel>,InferCreationAttributes<Hotel>>{
    declare id :CreationOptional<number>;
    declare name:string;
    declare address:string
    declare roomId:number
    declare roomType:roomType
    declare location:string;
    declare createdAt:CreationOptional<Date>;
    declare updatedAt:CreationOptional<Date>;
    declare rating?:number;
    declare ratingCount?:number;
    declare deletedAt:CreationOptional<Date|null>;
}

Hotel.init({
    id:{
        type:"INTEGER",
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:"STRING",
        allowNull:false
    },
    address:{
        type:"STRING",
        allowNull:false
    },
    location:{
        type:"STRING",
        allowNull:false
    },
    createdAt:{
        type:"DATE",
        defaultValue: new Date()
    },
    updatedAt:{
        type:"DATE",
        defaultValue:new Date()
    },
    roomId:{
        type:"INTEGER",
        allowNull:true,
        defaultValue:null
    },
    roomType:{
        type:"ENUM",
        allowNull:false,
        defaultValue:"STANDARD"
    },
    rating:{
        type:"FLOAT",
        defaultValue:null
    },
    ratingCount:{
        type:"INTEGER",
        defaultValue:null
    },
    deletedAt:{
        type:"DATE",
        defaultValue:null
    }

},
{
    tableName:"hotels",
    sequelize:sequelize,
    underscored:true,
    timestamps:true,
    paranoid:true,
})


export default Hotel