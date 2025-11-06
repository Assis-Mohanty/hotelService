import { CreateRoomDTO} from "../dto/room.dto";
import { RoomType } from "../models/room";
import { Room } from "../models/association.model";


export async function createRoomRepository(createRoomDTO: CreateRoomDTO) {
  const room = await Room.create({
    ...createRoomDTO,
    roomType: createRoomDTO.roomType ?? RoomType.STANDARD, 
  });
  return room;
}
export async function getRoomRepository(id:number) {
    const room=await Room.findByPk(id)
    return room
}

export async function  updateRoomRepository(id:number,updateRoomDTO:CreateRoomDTO) {
    const room = await Room.update(updateRoomDTO,{
        where:{
            id:id
        }
    }
)
    return room
}

export async function  deleteRoomRepository(id:number) {
    return await Room.destroy({
        where:{
            id:id
        }
    });
}