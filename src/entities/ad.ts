import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { CategoryEntity } from "./category";

@Entity('Ad')
export class AdEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    title:string;

    @ManyToMany(()=>CategoryEntity)
    @JoinTable({
        name:"CatAd",
        joinColumn: {
            name: "AdId",
            referencedColumnName: "id",
          },
          inverseJoinColumn: {
            name: "CategoryId",
            referencedColumnName: "id",
          },
    })
    category : CategoryEntity [];

}