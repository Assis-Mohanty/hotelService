import express from 'express'
import { validateRequestBody } from '../../validators';
import { roomValidator } from '../../validators/room.validator';
import { createRoomHandler, deleteRoomHandler, getRoomHandler, updateRoomHandler } from '../../controllers/room.controller';

const roomRouter= express.Router();

roomRouter.post('/',validateRequestBody(roomValidator),createRoomHandler)
roomRouter.get('/:id',getRoomHandler)
roomRouter.put('/:id',updateRoomHandler)
roomRouter.delete('/:id',deleteRoomHandler)

export default roomRouter