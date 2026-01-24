import { RoomGenerationJobDTO} from "../dto/roomGeneration.dto";
import { queue } from "./queue";
export const generateRoomJob:string='generaterooms'
export async function GenerateRooms(payload:RoomGenerationJobDTO) {
    const job = await queue.add(generateRoomJob,payload)
    console.log("JOB ADDED ",job.id ,job.name)
}
