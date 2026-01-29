import BaseService from "./baseService";
import Room from "../models/room";
import RoomRepository from "../repository/room.repository";
import RoomCategoryRepository from "../repository/roomCategory.repository";
import nodeCron from "node-cron";
import { GenerateRooms } from "../producer/producer";
import { roomWorker } from "../workers/worker";

const roomCategoryRepository = new RoomCategoryRepository();
const roomRepository = new RoomRepository();

export default class RoomService extends BaseService<Room> {
  private roomRepository: RoomRepository;
  constructor() {
    const roomRepository = new RoomRepository();
    super(new RoomRepository(), "Room");
    this.roomRepository = roomRepository;
  }

  async findByRoomCategoryAndDateService(
    roomCategoryId: number,
    currentDate: Date,
  ) {
    return await this.roomRepository.findByRoomCategoryAndDate(
      roomCategoryId,
      currentDate,
    );
  }

  async findByRoomCategoryAndDateInRangeOfDatesService(
    roomCategoryId: number,
    startDate: Date,
    endDate: Date,
  ) {
    return await this.roomRepository.findByRoomCategoryAndDateInRangeOfDates(
      roomCategoryId,
      startDate,
      endDate,
    );
  }
  async createRoomsBulkService(data: Room[]) {
    return await this.roomRepository.bulkCreate(data);
  }
  async updateBookingIdService(bookingId:number,roomIds:number[]){
    return await this.roomRepository.updateBookingId(bookingId,roomIds)
  }
}

// export async function createRoomForAllRoomCategoryForNextDate() {
//   const roomCategories = await roomCategoryRepository.findAll();
//   const lastCreatedDate = await roomRepository.getRoomCreationLastDate();

//   const date = new Date(lastCreatedDate as string | number | Date);
//   const rooms: RoomGenerationJobDTO[] = [];

//   roomCategories.forEach((roomCategory) => {
//     rooms.push({
//       roomCategoryId: roomCategory.id,
//       startDate: String(date),
//       endDate: String(date.setDate(date.getDate() + 1)),
//       priceOverride: roomCategory.price,
//       batchSize: 1,
//     });
//   });
//   return rooms;
// }

export async function createRoomForAllRoomCategoryForNextDate() {
  const roomCategories = await roomCategoryRepository.findAll();
  const lastCreatedDate = await roomRepository.getRoomCreationLastDate();

  if (!lastCreatedDate) {
    throw new Error("No rooms exist yet");
  }

  // Base date from DB
        const nextDate = new Date(lastCreatedDate);
        nextDate.setDate(nextDate.getDate() + 1);

        const startDate = nextDate.toISOString().slice(0, 10);

        const endDateObj = new Date(nextDate);
        endDateObj.setDate(endDateObj.getDate() + 1);
        const endDate = endDateObj.toISOString().slice(0, 10);


  return roomCategories.map((roomCategory) => ({
    roomCategoryId: roomCategory.id,
    startDate: startDate,
    endDate: endDate, 
    priceOverride: roomCategory.price,
    batchSize: 1,
  }));
}


export async function ScheduleRoomsAndToQueue() {
  nodeCron.schedule("* */24 * * * *", async () => {
    const rooms = await createRoomForAllRoomCategoryForNextDate();
    rooms.forEach((room) => {
      GenerateRooms(room);
    });
    console.log ("rooms generated")
    roomWorker();
  });
}
