import { AdEntity } from "../entities/ad";
import { CategoryEntity } from "../entities/category";

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

public async addCategory(ad: AdEntity, category: CategoryEntity) {
    //console.log(ad.category);
    if (ad.category != undefined) {
     // console.log("if 1", ad.category);
      ad.category.push(category);
   } else {
        ad.category = [category];
   }

    await ad.save();

   return ad;
  }

}