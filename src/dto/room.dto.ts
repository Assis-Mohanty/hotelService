import { RoomType } from "../models/room"

export type CreateRoomDTO={
    roomNumber:number;
    hotelId:number;
    price:number;
    roomType?:RoomType;
}
