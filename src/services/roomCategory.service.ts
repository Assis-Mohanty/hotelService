import { WhereOptions } from "sequelize";
import { CreateRoomCategoryDTO } from "../dto/roomCategory.dto";
// import { createRoomRepository, deleteRoomRepository, getRoomRepository , updateRoomRepository } from "../repository/roomCategory.repository";

import RoomCategoryRepository from "../repository/roomCategory.repository";
const roomCategoryRepository = new RoomCategoryRepository();
export async function createRoomService(createRoomCategoryDTO:CreateRoomCategoryDTO ) {
    const roomRoomCategory = await roomCategoryRepository.create(createRoomCategoryDTO);
    return roomRoomCategory
}

export async function getRoomService(id:number) {
    const roomRoomCategory = await roomCategoryRepository.findById(id);
    return roomRoomCategory
}

export async function updateRoomService(id:number,updateRoomDTO:CreateRoomCategoryDTO) {
    const roomRoomCategory = await roomCategoryRepository.update(id,updateRoomDTO);
    return roomRoomCategory
}

export async function deleteRoomService(id:WhereOptions) {
    const count =await roomCategoryRepository.delete(id);
    return count

}