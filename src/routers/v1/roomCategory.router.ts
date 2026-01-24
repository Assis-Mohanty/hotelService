import express from 'express'
import { validateRequestBody } from '../../validators';
import { roomCategoryValidator, } from '../../validators/room.validator';
import { createRoomCategoryHandler,  deleteRoomCategoryHandler , getRoomCategoryHandler , updateRoomCategoryHandler } from '../../controllers/roomCategory.controller';

const roomCategoryRouter= express.Router();

roomCategoryRouter.post('/',validateRequestBody(roomCategoryValidator),createRoomCategoryHandler)
roomCategoryRouter.get('/:id',getRoomCategoryHandler)
roomCategoryRouter.put('/:id',updateRoomCategoryHandler)
roomCategoryRouter.delete('/:id',deleteRoomCategoryHandler)

export default roomCategoryRouter