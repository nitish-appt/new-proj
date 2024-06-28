import * as TypeGraphQL from 'type-graphql';
import * as TypeORM from 'typeorm';
import { nanoid } from 'nanoid';
import constants from '../constants.js';

@TypeGraphQL.ObjectType()
export abstract class BaseEntity {
    @TypeGraphQL.Field(() => TypeGraphQL.ID)
    @TypeORM.PrimaryColumn('varchar')
    id!: string;

    @TypeORM.BeforeInsert()
    generateUuid() {
        this.id = nanoid(constants.ID_FIELD_LENGTH);
    }
}
