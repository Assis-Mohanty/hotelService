import { RoomGenerationJobDTO } from "../dto/roomGeneration.dto";
import RoomCategoryRepository from "../repository/roomCategory.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";
import RoomCategory from "../models/roomCategory";
import RoomRepository from "../repository/room.repository";
import Room from "../models/room";
import { CreationAttributes } from "sequelize";
import logger from "../config/logger.config";

const roomCategoryRepository = new RoomCategoryRepository();
const roomRepository = new RoomRepository();

export async function generateRooms(jobData:RoomGenerationJobDTO) {
    const roomCategory= await roomCategoryRepository.findById(jobData.roomCategoryId);
    if(!roomCategory){
        throw new NotFoundError(`Room Category with ${jobData.roomCategoryId} not found`);
    }
    const startDate = new Date(jobData.startDate);
    const endDate = new Date(jobData.endDate);
    let totalRoomsCreated = 0;
    let totalDatesProcessed = 0;

    if (startDate > endDate) {
        throw new BadRequestError("Start date must be before end date");
    }

    if (startDate< new Date()) {
        throw new BadRequestError("Start date must be in the future");
    }
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    logger.info(`totalDays to process ${totalDays}`);
    const currentDate = new Date(startDate);
    while(currentDate< endDate){
        const batchEndDate= new Date(currentDate);
        batchEndDate.setDate(batchEndDate.getDate() + jobData.batchSize);
        if(batchEndDate > endDate){
            batchEndDate.setTime(endDate.getTime());
        }
        const batchResult= await processDateBatch(roomCategory,currentDate,batchEndDate,jobData.priceOverride);
        totalRoomsCreated+=batchResult.roomsCreated;
        totalDatesProcessed+=batchResult.datesProcessed;
        currentDate.setDate(currentDate.getDate() + jobData.batchSize);

    }

    return {totalRoomsCreated,totalDatesProcessed};

}

export async function processDateBatch(roomCategory:RoomCategory,startDate:Date,endDate:Date,priceOverride?:number){
    let roomsCreated =0;
    let datesProcessed=0;
    const roomToCreate:CreationAttributes<Room>[] =[];
    
    const currentDate = new Date(startDate);
    const existingRoom = await roomRepository.findByRoomCategoryAndDateInRangeOfDates(roomCategory.id,startDate,endDate);
    const existingDates=new Set(
        existingRoom.map(r=>r.dateOfAvaliability)
    )
    while (currentDate <= endDate) {
        const key= currentDate.toISOString().slice(0, 10)
        if(!existingDates.has(key)){
            roomToCreate.push({
                hotelId:roomCategory.hotelId,
                roomCategoryId:roomCategory.id,
                dateOfAvaliability:key,
                price:priceOverride ?? roomCategory.price,
            })
            
        }
        currentDate.setDate(currentDate.getDate() + 1);
        datesProcessed++;
    }

    if(roomToCreate.length>0){
        const createdRooms = await roomRepository.bulkCreate(roomToCreate);
        roomsCreated=createdRooms.length;
    }
    return {roomsCreated,datesProcessed};
}