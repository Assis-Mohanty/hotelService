import { CreationAttributes, Op } from "sequelize";
import Room from "../models/room";
import BaseRepository from "./baseRepository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import { getRoomCategoryService } from "../services/roomCategory.service";


export default class RoomRepository extends BaseRepository<Room>{
    constructor(){
        super(Room)
    }

    async findByRoomCategoryAndDate(roomCategoryId:number,currentDate:Date){
        return await this.model.findOne({
            where:{
                roomCategoryId:roomCategoryId,
                dateOfAvaliability:currentDate
            }
        })
    }
    async findByRoomCategoryAndDateInRangeOfDates(roomCategoryId:number,startDate:Date,endDate:Date){
        return await this.model.findAll({
            where:{
                roomCategoryId:roomCategoryId,
                dateOfAvaliability:{
                    [Op.gte]:startDate,
                    [Op.lte]:endDate
                }

            }
        })
    }

    async bulkCreate(roomsData:CreationAttributes<Room>[]):Promise<Room[]>{
        if (roomsData.length===0){
            throw new BadRequestError("Request body is invalid")
        }
        const roomCategoryId=roomsData[0].roomCategoryId
        const roomCategory=await getRoomCategoryService(roomCategoryId)
        if (!roomCategory){
            throw new NotFoundError("Room Category not found")

        }
        const result= roomsData.map(room=>({
            ...room,
            price:room.price??roomCategory.price
        }))

        const createdRooms = await this.model.bulkCreate(result);
        return createdRooms;
    }
    async getRoomCreationLastDate(): Promise<string | null> {
    return await this.model.max("dateOfAvaliability");
}
    async updateBookingId(bookingId:number,roomIds:number[]){
        return await this.model.update({
            bookingId:bookingId
        },{
            where: {
                id: {
                    [Op.in]: roomIds
                }
                }
        })
    }

}