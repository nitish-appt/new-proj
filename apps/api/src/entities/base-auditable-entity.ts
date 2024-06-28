import * as TypeORM from 'typeorm';
import * as TypeGraphQL from 'type-graphql';
import { BaseEntity } from './base-entity.js';

@TypeGraphQL.ObjectType()
export abstract class BaseAuditableEntity extends BaseEntity {
    @TypeGraphQL.Field({ nullable: true })
    @TypeORM.Column({ nullable: true })
    public updatedOn?: Date;

    @TypeGraphQL.Field({ nullable: true })
    @TypeORM.Column({ nullable: true })
    public createdOn!: Date;

    @TypeORM.BeforeUpdate()
    public setUpdatedAt() {
        this.updatedOn = new Date();
    }

    @TypeORM.BeforeInsert()
    public setCreatedOn() {
        this.createdOn = new Date();
    }
}
