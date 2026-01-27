import { NextFunction, Request, Response } from "express";
import RoomService, { ScheduleRoomsAndToQueue } from "../services/room.services";
import { InternalServerError } from "../utils/errors/app.error";
import { generateRooms } from "../services/generateRoom.service";
import { RoomGenerationJobDTO, RoomGenerationJobSchema } from "../dto/roomGeneration.dto";
import { GenerateRooms } from "../producer/producer";
const roomService = new RoomService()

export async function GenerateRoomHandler(req: Request,res:Response,){
    const jobData = req.body;
    const result = await generateRooms(jobData);
    res.status(200).json({
        message: "Rooms generated successfully",
        data: result,
    });
}

export async function createRoomHandler(req :Request,res:Response,next:NextFunction) {
    const roomData = req.body;
    const result = await roomService.create(roomData)
    if(!result){
        throw new InternalServerError("Error creating a user")
    }
    res.status(200).json({
        message: "Rooms created successfully",
        data: result,
    });
}

export async function getRoomHandler(req:Request,res:Response,next:NextFunction){
    const result = await roomService.getById(Number(req.params.id));
    if(!result){
        throw new InternalServerError("Error fetching a room")
    }
    res.status(200).json({
        message: "Room fetched successfully",
        data: result,
    });
}



export async function findAllHandler(req:Request,res:Response,next:NextFunction){
    const result = await roomService.findAll();
    res.status(200).json({
        message: "Rooms fetched  successfully",
        data: result,
    });
    
}

export async function findByRoomCategoryAndDateHandler(req:Request,res:Response,next:NextFunction){
    const roomCategoryId = Number(req.params.id)
    const currentDatestring = req.query.currentDate as string
    if (!currentDatestring || Number.isNaN(roomCategoryId)) {
    res.status(400).json({
      message: "roomCategoryId and currentDate are required",
    });
    return;
  }
    const currentDate = new Date(currentDatestring)
    if (isNaN(currentDate.getTime())) {
    res.status(400).json({
      message: "Invalid date format",
    });
    return;
    }
    const result = await roomService.findByRoomCategoryAndDateService(roomCategoryId,currentDate);
    res.status(200).json({
        message: "Rooms fetched  successfully",
        data: result,
    });
    
}


export async function findByRoomCategoryAndDateInRangeOfDatesHandler(req:Request,res:Response,next:NextFunction){
    const roomCategoryId = Number(req.params.id) 
    const startDatestring = req.query.startDate as string
    const endDatestring = req.query.endDate as string
    const startDate = new Date(startDatestring)
    const endDate = new Date(endDatestring)


    const result = await roomService.findByRoomCategoryAndDateInRangeOfDatesService(roomCategoryId,startDate,endDate);

    res.status(200).json({
        message: "Rooms fetched  successfully",
        data: result,
    });

}

export async function createRoomBulk(req :Request,res:Response,next:NextFunction) {
    const roomData = req.body;
    const result = await roomService.createRoomsBulkService(roomData)

    res.status(200).json({
        message: "Rooms created successfully",
        data: result,
    });
}

export async function generateRoomJobHandler(req:Request,res:Response,next:NextFunction) {
    const reqBody=RoomGenerationJobSchema.safeParse(req.body)
    if (!reqBody.success){
        res.status(400).json({
            message:"invalid request body",
            error:reqBody.error.errors
        })
        return
    }
    const payload :RoomGenerationJobDTO= reqBody.data
    await GenerateRooms(payload)
    res.status(200).json({
        message:"generated rooms successfully",
        error: null,
        data:payload
    })
}


export async function deleteRoomHandler(req :Request,res:Response,next:NextFunction) {
    const roomId= Number(req.params.id)
    const result = await roomService.delete({id:roomId})

    res.status(200).json({
        message: "Rooms deleted successfully",
        data: result,
    });
}
export async function updateRoomHandler(req :Request,res:Response,next:NextFunction) {
    const roomId = Number(req.params.id)
    const roomData = req.body;
    const result = await roomService.update(roomId,roomData)

    res.status(200).json({
        message: "Rooms created successfully",
        data: result,
    });
}

export async function ScheduleRoomsAndToQueueHandler(req :Request,res:Response,next:NextFunction) { 
    await ScheduleRoomsAndToQueue();
    res.status(200).json({
        message:"Room created",
        error: null
    })
}





