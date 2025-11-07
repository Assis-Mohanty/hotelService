import { RoomCategoryType } from "../models/roomCategory"

export type createHotelDTO={
    name:string,
    address:string,
    location:string,
    rating?:number,
    ratingCount?:number,
    roomId?:number,
    roomType?:RoomCategoryType
}

export type updateHotelDTO={
    name?:string,
    address?:string,
    location?:string,
    rating?:number,
    ratingCount?:number
}