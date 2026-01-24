import { CreationAttributes, Model, ModelStatic, WhereOptions } from "sequelize";


class BaseRepository<T extends Model>{
    protected model:ModelStatic<T>
    constructor(model:ModelStatic<T>){
        this.model = model
    }

    async findById(id:number):Promise<T|null>{
        const record= await this.model.findByPk(id)
        if(!record){
            return null
        }
        return record
    }

    async findAll(): Promise<T[]> {
        const records = await this.model.findAll({});
        if (!records) {
            return [];
        }
        return records;
    }

    async delete(whereOptions:WhereOptions<T>):Promise<any>{
        const deletedCount=await this.model.destroy({
            where:{
                ...whereOptions
            }
        })
        return deletedCount
    }

    async update(id:number,data:Partial<T>):Promise<T | null>{
        const record = await this.model.findByPk(id);
        if(!record){
            return null
        }
        Object.assign(record,data)
        await record.save();
        return record
    }
    async create(data:CreationAttributes<T>):Promise<T | null>{
        const record = await this.model.create(data);
        return record
    }
}

export default BaseRepository;