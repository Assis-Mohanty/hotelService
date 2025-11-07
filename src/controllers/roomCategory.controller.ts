import { NextFunction, Request, Response } from "express";
import { createRoomService, deleteRoomService, getRoomService, updateRoomService } from "../services/roomCategory.service";
import { InternalServerError } from "../utils/errors/app.error";

export async function createRoomHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await createRoomService(req.body);
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot create room ")   
    }
    res.status(200).json({
        message:"success",
        data:roomRoomCategory,
    })
}

export async function getRoomHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await getRoomService(Number(req.params.id));
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot get room")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })

}
export async function updateRoomHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await updateRoomService(Number(req.params.id),req.body);
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot update room")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })

}
export async function deleteRoomHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory =await deleteRoomService({id:Number(req.params.id)});
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot delete room")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })
    
}