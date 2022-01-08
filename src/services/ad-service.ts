import { AdEntity } from "../entities/ad";

export class AdService {
public async insert(data : AdEntity){
    const ad = AdEntity.create(data);
    ad.save()
    return await ad;
}
public async find(id:number){
    const ad = await AdEntity.findOne(id);
    return ad;
}

public async findAll(page:number,count:number){
    const ad = await AdEntity.find({
        skip:page*count,
        take:count,
        order:{id:'ASC'}
    })
    return ad;
}
public async delete(id:number){
    const ad = await AdEntity.delete(id)
    return ad;
}


}