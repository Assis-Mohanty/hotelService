import Room from "../models/room";
import BaseRepository from "./baseRepository";

export default class RoomRepository extends BaseRepository<Room>{
    constructor(){
        super(Room)
    }
}