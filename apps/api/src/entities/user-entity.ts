import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm'; 
import { BaseAuditableEntity } from './base-auditable-entity.js';



@TypeORM.Entity()
@TypeGraphQL.ObjectType()
class User extends BaseAuditableEntity{
   
    @TypeGraphQL.Field(() => String,{nullable: true})
    @TypeORM.Column({type:"varchar", nullable: true}) 
    firstName?: string;  
   
    @TypeGraphQL.Field(() => String,{nullable: true})
    @TypeORM.Column({type:"varchar", nullable: true}) 
    lastName?: string;  
   
    @TypeGraphQL.Field(() => String,{nullable: false})
    @TypeORM.Column({type:"varchar", nullable: false}) 
    email!: string;  
   
    @TypeGraphQL.Field(() => String,{nullable: false})
    @TypeORM.Column({type:"varchar", nullable: false}) 
    password!: string;  
   
   
}

export { User };