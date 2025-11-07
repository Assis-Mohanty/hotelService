// import { CreateRoomDTO} from "../dto/roomCategory.dto";
// import { RoomType } from "../models/roomCategory";
import RoomCategory from "../models/roomCategory";
import BaseRepository from "./baseRepository";


// export async function createRoomRepository(createRoomDTO: CreateRoomDTO) {
//   const roomRoomCategory = await RoomCategory.create({
//     ...createRoomDTO,
//     roomType: createRoomDTO.roomType ?? RoomType.STANDARD, 
//   });
//   return roomRoomCategory;
// }
// export async function getRoomRepository(id:number) {
//     const roomRoomCategory=await RoomCategory.findByPk(id)
//     return roomRoomCategory
// }

// export async function  updateRoomRepository(id:number,updateRoomDTO:CreateRoomDTO) {
//     const roomRoomCategory = await RoomCategory.update(updateRoomDTO,{
//         where:{
//             id:id
//         }
//     }
// )
//     return roomRoomCategory
// }

// export async function  deleteRoomRepository(id:number) {
//     return await RoomCategory.destroy({
//         where:{
//             id:id
//         }
//     });
// }


export default class RoomRepository extends BaseRepository<RoomCategory>{
    constructor(){
        super(RoomCategory);
    }
}