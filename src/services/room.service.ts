import { CreateRoomDTO } from "../dto/room.dto";
import { createRoomRepository, deleteRoomRepository, getRoomRepository , updateRoomRepository } from "../repository/room.repository";

export async function createRoomService(createRoomDTO:CreateRoomDTO) {
    const room = await createRoomRepository(createRoomDTO);
    return room
}

export async function getRoomService(id:number) {
    const room = await getRoomRepository(id);
    return room
}

export async function updateRoomService(id:number,updateRoomDTO:CreateRoomDTO) {
    const room = await updateRoomRepository(id,updateRoomDTO);
    return room
}

export async function deleteRoomService(id:number) {
    return await deleteRoomRepository(id);
}