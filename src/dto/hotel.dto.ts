import { RoomType } from "../models/room"

export type createHotelDTO={
    name:string,
    address:string,
    location:string,
    rating?:number,
    ratingCount?:number,
    roomId?:number,
    roomType?:RoomType
}

export type updateHotelDTO={
    name?:string,
    address?:string,
    location?:string,
    rating?:number,
    ratingCount?:number
}