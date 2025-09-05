import { Request,Response,NextFunction } from "express";
import { createHotelService, deleteHotelByIdService, getAllHotelsService, getByPkHotelService, updateHotelByIdService } from "../services/hotel.service";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotelHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse=await createHotelService(req.body);
    res.status(201).json({
        message:"Hotel Created Successfully",
        data:hotelResponse,
        success:true
    })
   next();
    
}

export async function getAllHotelsHandler(req:Request,res:Response, next:NextFunction) {
    const hotelResponse=await getAllHotelsService();
    res.status(200).json({
        message:"Hotels Fetched Successfully",
        data:hotelResponse,
        success:true
    })
    next();
}

export async function getHotelByIdHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse=await getByPkHotelService(Number(req.params.id));
    try {
        res.status(200).json({
            message:"Hotel found succesfully",
            data:hotelResponse,
            success:true
        })
        next();
    } catch (error) {
        throw new NotFoundError("not found");
    }
}

export async function deleteHotelByIdHandler(req:Request,res:Response,next:NextFunction){
    const hotelResponse=await deleteHotelByIdService(Number(req.params.id));
    res.status(200).json({
        message:"Hotel deleted successfully",
        data:hotelResponse,
        success:true
    })
    next();
}

export async function updateHotelByIdHandler(req:Request,res:Response,next:NextFunction) {
    const hotelResponse=await updateHotelByIdService(Number(req.params.id),req.body);
    res.status(200).json({
        message:"Hotel updated successfully",
        data:hotelResponse,
        success:true
    })
    next();
}