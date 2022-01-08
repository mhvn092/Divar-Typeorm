import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdEntity } from "./ad";

@Entity('Category')
export class CategoryEntity extends BaseEntity {
    @PrimaryGeneratedColumn ()
    id:number;

    @Column()
    name:string;

    @ManyToMany(()=>AdEntity)
    @JoinTable({
        name:"CatAd",
        joinColumn: {
            name: "CategoryId",
            referencedColumnName: "id",
          },
          inverseJoinColumn: {
            name: "AdId",
            referencedColumnName: "id",
          },
    })
    ad : AdEntity [];
}