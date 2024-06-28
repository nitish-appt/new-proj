import * as TypeGraphQL from 'type-graphql';
import { IsString, Length, IsNotEmpty } from 'class-validator';
import { IdValidator  } from '../utils/index.js';


@TypeGraphQL.InputType()
class UserFilterInput {

    @TypeGraphQL.Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IdValidator()
    id?: string;

    @TypeGraphQL.Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    firstName?: string;

    @TypeGraphQL.Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    lastName?: string;

    @TypeGraphQL.Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    email?: string;

    @TypeGraphQL.Field(() => String, { nullable: true })
    @IsNotEmpty()
    @IsString()
    @Length(1)
    password?: string;

}
export { UserFilterInput };