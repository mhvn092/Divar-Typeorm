import { CategoryEntity } from "../entities/category";

export class CategoryService {
    public async insert(data : CategoryEntity){
        const cat = CategoryEntity.create(data);
        await cat.save()
        return cat;
    }
    public async find(id:number){
        const cat = await CategoryEntity.findOne(id);
        return cat;
    }
    
    public async findAll(page:number,count:number){
        const cat = await CategoryEntity.find({
            skip:page*count,
            take:count,
            order:{id:'ASC'}
        })
        return cat;
    }
    public async delete(id:number){
        const cat = await CategoryEntity.delete(id)
        return cat;
    }
}