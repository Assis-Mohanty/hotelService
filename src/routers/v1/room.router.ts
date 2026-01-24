import express from "express"
import { createRoomBulk, createRoomHandler, deleteRoomHandler, findAllHandler, findByRoomCategoryAndDateHandler, findByRoomCategoryAndDateInRangeOfDatesHandler, GenerateRoomHandler, generateRoomJobHandler, getRoomHandler, updateRoomHandler } from "../../controllers/room.controller"

export const roomRouter = express.Router()

roomRouter.get('/:id',getRoomHandler)
roomRouter.get('/',findAllHandler)
roomRouter.post('/',createRoomHandler)
roomRouter.delete('/:id',deleteRoomHandler)
roomRouter.patch('/:id',updateRoomHandler)
roomRouter.post('/bulk',createRoomBulk)
roomRouter.post('/generate',generateRoomJobHandler)
roomRouter.post('/find',GenerateRoomHandler)
roomRouter.get('/category/:id/date',findByRoomCategoryAndDateHandler)
roomRouter.get('/category/:id/range',findByRoomCategoryAndDateInRangeOfDatesHandler)


