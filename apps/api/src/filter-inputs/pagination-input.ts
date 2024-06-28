import { IsInt } from 'class-validator';
import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.InputType()
class PaginationInput {
  @TypeGraphQL.Field(() => TypeGraphQL.Int, { nullable: true })
  @IsInt()
  take?: number;

  @TypeGraphQL.Field(() => TypeGraphQL.Int, { nullable: true })
  @IsInt()
  offset?: number;
}
export { PaginationInput };
