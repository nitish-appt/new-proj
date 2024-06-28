import { IsIn, IsString, Length } from 'class-validator';
import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.InputType()
class SortInput {
  @TypeGraphQL.Field(() => String, { nullable: false })
  @IsString()
  @Length(1, 20)
  property!: string;

  @TypeGraphQL.Field(() => String, { nullable: false })
  @IsString()
  @Length(1, 4)
  @IsIn(['asc', 'ASC', 'desc', 'DESC'])
  direction!: string;
}
export { SortInput };
