import { Model, WhereOptions } from "sequelize";
import BaseRepository from "../repository/baseRepository";
import { NotFoundError } from "../utils/errors/app.error";

export default class BaseService <T extends Model>{
    protected repository: BaseRepository<T>
    protected entityName:string;
    constructor(repository:BaseRepository<T>,entityName:string){
        this.repository=repository;
        this.entityName=entityName;
    }

    async getById(id:number):Promise<T>{
        const result= await this.repository.findById(id)
        if(!result){
            throw new NotFoundError(`no entity found with ${this.entityName}`)
        }
        return result
    }

    async create(data:any):Promise<T | null>{
        return await this.repository.create(data)

    }

    async findAll():Promise<T[]>{
        return await this.repository.findAll()
    }

    async delete(whereOptions:WhereOptions):Promise<any>{
        return await this.repository.delete(whereOptions)
    }
    
    async update(id:number,data:any):Promise<T | null>{
        return await this.repository.update(id,data)
    }

}