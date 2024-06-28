import { IsInt } from 'class-validator';
import * as TypeGraphQL from 'type-graphql';

@TypeGraphQL.ObjectType()
class PaginationOutput {
  @TypeGraphQL.Field(() => TypeGraphQL.Int)
  @IsInt()
  take!: number;

  @TypeGraphQL.Field(() => TypeGraphQL.Int)
  @IsInt()
  offset!: number;

  @TypeGraphQL.Field(() => TypeGraphQL.Int)
  @IsInt()
  totalCount!: number;
}

export function BaseFilterOutput<TItemsFieldValue>(
  itemsFieldValue: TypeGraphQL.ClassType<TItemsFieldValue>
) {
  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @TypeGraphQL.ObjectType({ isAbstract: true })
  abstract class FilterOutputClass {
    @TypeGraphQL.Field(() => [itemsFieldValue])
    items!: TItemsFieldValue[];

    @TypeGraphQL.Field(() => PaginationOutput)
    pagination!: PaginationOutput;
  }

  return FilterOutputClass;
}
