import { RoomCategoryType } from "../models/roomCategory"

export interface CreateRoomCategoryDTO{
    hotelId:number;
    price:number;
    roomType:RoomCategoryType;
    roomCount:number;
}
