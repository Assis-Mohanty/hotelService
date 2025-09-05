import express from 'express';
import {  validateRequestBody } from '../../validators';
import { hotelSchema } from '../../validators/hotel.validator';
import { createHotelHandler, deleteHotelByIdHandler, getAllHotelsHandler, getHotelByIdHandler, updateHotelByIdHandler } from '../../controllers/hotel.controler';

const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema),createHotelHandler ); 
hotelRouter.get('/',validateRequestBody(hotelSchema),getAllHotelsHandler);
hotelRouter.get('/:id',validateRequestBody(hotelSchema),getHotelByIdHandler);
hotelRouter.delete('/:id',validateRequestBody(hotelSchema),deleteHotelByIdHandler);
hotelRouter.patch('/:id',validateRequestBody(hotelSchema),updateHotelByIdHandler);

export default hotelRouter;