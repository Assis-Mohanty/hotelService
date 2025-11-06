import { NextFunction, Request, Response } from "express";
import { createRoomService, deleteRoomService, getRoomService, updateRoomService } from "../services/room.service";
import { InternalServerError } from "../utils/errors/app.error";

export async function createRoomHandler(req:Request,res:Response,next:NextFunction) {
    const room=await createRoomService(req.body);
    if(!room){
        throw new InternalServerError("Something went wrong cannot create room ")   
    }
    res.status(200).json({
        message:"success",
        data:room,
    })
}

export async function getRoomHandler(req:Request,res:Response,next:NextFunction) {
    const room=await getRoomService(Number(req.params.id));
    if(!room){
        throw new InternalServerError("Something went wrong cannot get room")   
    }
    res.status(200).json({
        message:true,
        data:room
    })

}
export async function updateRoomHandler(req:Request,res:Response,next:NextFunction) {
    const room=await updateRoomService(Number(req.params.id),req.body);
    if(!room){
        throw new InternalServerError("Something went wrong cannot update room")   
    }
    res.status(200).json({
        message:true,
        data:room
    })

}
export async function deleteRoomHandler(req:Request,res:Response,next:NextFunction) {
    const room=await deleteRoomService(Number(req.params.id));
    if(!room){
        throw new InternalServerError("Something went wrong cannot delete room")   
    }
    res.status(200).json({
        message:true,
        data:room
    })

}