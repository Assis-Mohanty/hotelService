import logger from "../config/logger.config";
import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { Hotel } from "../models/association.model";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData:createHotelDTO) {
    const hotel=await Hotel.create({
        name:hotelData.name,
        address:hotelData.address,
        location:hotelData.location,
        rating:hotelData.rating,
        ratingCount:hotelData.ratingCount
    })
    logger.info(`Hotel Created : ${hotel.id}`);
    return hotel;
}

export async function getHotelById(id:number){
    const hotel=await Hotel.findByPk(id);
    if(!hotel){
        throw new NotFoundError(`Hotel with id ${id} not found`);
    }
    logger.info(`Hotel found:${hotel.id}`);
    return hotel;
}

export async function getAllHotels() {
    const hotels=await Hotel.findAll({
        where:{
            deletedAt:null
        }
    });
    if(hotels.length===0){
        throw new NotFoundError(`Hotels not found`);
    }
    logger.info(`Number of Hotels found : ${hotels.length}`)
    logger.info(`Hotels found : ${hotels}`)

    return hotels;
}

export async function deleteHotelById(id:number) {
    const hotel=await Hotel.findByPk(id);
    if(!hotel){
        throw new NotFoundError(`Hotel not found`)
    }
    await hotel.destroy();
    // hotel.deletedAt=new Date();
    // await hotel.save();
    logger.info(`Hotel soft deleted with :${hotel.id}`);
    return hotel;
}

export async function updateHotelById(id:number,hotelData:updateHotelDTO) {
    const hotel=await Hotel.update(
        hotelData,
        {
            where:{
                id:id,
                deletedAt:null
            },
            returning:true,
        }
        
    )
    logger.info(`Hotel updated with :${id} data:${hotel[1]}`);
    return hotel
}

