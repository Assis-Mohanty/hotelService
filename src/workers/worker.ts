import { Job, Worker } from "bullmq";
import { generateRooms } from "../services/generateRoom.service";
import { RoomGenerationJobDTO } from "../dto/roomGeneration.dto";
import { queueName, redisConnection } from "../producer/queue";


export const roomWorker=() => new Worker(queueName,
    async(job:Job<RoomGenerationJobDTO>)=>{
        // console.log("JOB PICKED:",job.id,job.name)
        const result = await generateRooms(job.data)
        console.log("JOB DONE:", job.id, result);
    },
    {
        connection:redisConnection
    }
)


