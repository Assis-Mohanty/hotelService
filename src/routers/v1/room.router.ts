import express from "express"
import { createRoomBulk, createRoomHandler, deleteRoomHandler, findAllHandler, findByRoomCategoryAndDateHandler, findByRoomCategoryAndDateInRangeOfDatesHandler, GenerateRoomHandler, generateRoomJobHandler, getRoomHandler, ScheduleRoomsAndToQueueHandler, updateBookingIdHandler, updateRoomHandler } from "../../controllers/room.controller"

export const roomRouter = express.Router()

roomRouter.get('/scheduled',ScheduleRoomsAndToQueueHandler)
roomRouter.get('/:id',getRoomHandler)
roomRouter.get('/',findAllHandler)
roomRouter.get('/category/:id/date',findByRoomCategoryAndDateHandler)
roomRouter.get('/category/:id/range',findByRoomCategoryAndDateInRangeOfDatesHandler)
roomRouter.post('/',createRoomHandler)
roomRouter.post('/bulk',createRoomBulk)
roomRouter.post('/generate',generateRoomJobHandler)
roomRouter.delete('/:id',deleteRoomHandler)
roomRouter.patch('/:id',updateRoomHandler)
roomRouter.patch('/bookings/:id',updateBookingIdHandler)
roomRouter.post('/find',GenerateRoomHandler)


