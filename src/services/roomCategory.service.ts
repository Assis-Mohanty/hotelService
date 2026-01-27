import { WhereOptions } from "sequelize";
import { CreateRoomCategoryDTO } from "../dto/roomCategory.dto";
import RoomCategoryRepository from "../repository/roomCategory.repository";

const roomCategoryRepository = new RoomCategoryRepository();
export async function createCategoryRoomService(createRoomCategoryDTO:CreateRoomCategoryDTO ) {
    const roomRoomCategory = await roomCategoryRepository.create(createRoomCategoryDTO);
    return roomRoomCategory
}

export async function getRoomCategoryService(id:number) {
    const roomRoomCategory = await roomCategoryRepository.findById(id);
    return roomRoomCategory
}
export async function getallRoomCategoryService() {
    const roomCategories = await roomCategoryRepository.findAll();
    return roomCategories
}

export async function updateRoomCategoryService(id:number,updateRoomDTO:CreateRoomCategoryDTO) {
    const roomRoomCategory = await roomCategoryRepository.update(id,updateRoomDTO);
    return roomRoomCategory
}

export async function deleteRoomCategoryService(id:WhereOptions) {
    const count =await roomCategoryRepository.delete(id);
    return count

}

