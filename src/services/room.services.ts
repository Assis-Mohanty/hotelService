import BaseService from "./baseService";
import Room from "../models/room";
import RoomRepository from "../repository/room.repository";

export default class RoomService extends BaseService<Room>{
    private roomRepository: RoomRepository;
    constructor(){
        const roomRepository = new RoomRepository();
        super(new RoomRepository(),"Room")
        this.roomRepository=roomRepository
    }

    async findByRoomCategoryAndDateService(roomCategoryId:number,currentDate:Date){
        return await this.roomRepository.findByRoomCategoryAndDate(roomCategoryId,currentDate)
    }

    async findByRoomCategoryAndDateInRangeOfDatesService(roomCategoryId:number,startDate:Date,endDate:Date){
        return await this.roomRepository.findByRoomCategoryAndDateInRangeOfDates(roomCategoryId,startDate,endDate)
    }
    async createRoomsBulkService(data:Room[]){
        return await this.roomRepository.bulkCreate(data)
    }
}