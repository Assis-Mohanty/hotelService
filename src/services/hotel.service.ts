import { createHotelDTO, updateHotelDTO } from "../dto/hotel.dto";
import { createHotel, deleteHotelById, getAllHotels, getHotelById, updateHotelById } from "../repository/hotel.respository";

export async function createHotelService(hotelData:createHotelDTO) {
    const hotel=await createHotel(hotelData);
    return hotel
    
}
export async function getByPkHotelService(id:number) {
    const hotel = await getHotelById(id);
    return hotel
}

export async function getAllHotelsService() {
    const hotels=await getAllHotels();
    return hotels
}

export async function deleteHotelByIdService(id:number) {
    const hotel=await deleteHotelById(id);
    return hotel
}
export async function updateHotelByIdService(id:number,hotelData:updateHotelDTO){
    const hotel=await updateHotelById(id,hotelData);
    return hotel
}