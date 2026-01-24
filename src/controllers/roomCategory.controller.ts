import { NextFunction, Request, Response } from "express";
import { createCategoryRoomService, deleteRoomCategoryService, getRoomCategoryService, updateRoomCategoryService } from "../services/roomCategory.service";
import { InternalServerError } from "../utils/errors/app.error";


export async function createRoomCategoryHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await createCategoryRoomService(req.body);
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot create roomcategory ")   
    }
    res.status(200).json({
        message:"success",
        data:roomRoomCategory,
    })
    next();
}

export async function getRoomCategoryHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await getRoomCategoryService(Number(req.params.id));
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot get roomcategory")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })
    next();


}
export async function updateRoomCategoryHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory=await updateRoomCategoryService(Number(req.params.id),req.body);
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot update roomcategory")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })
    next();


}
export async function deleteRoomCategoryHandler(req:Request,res:Response,next:NextFunction) {
    const roomRoomCategory =await deleteRoomCategoryService({id:Number(req.params.id)});
    if(!roomRoomCategory){
        throw new InternalServerError("Something went wrong cannot delete roomcategory")   
    }
    res.status(200).json({
        message:true,
        data:roomRoomCategory
    })
}