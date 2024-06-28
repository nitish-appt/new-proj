import {
    IsArray,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    ValidateNested,
  } from 'class-validator';
  import { ClassType, Field, InputType } from 'type-graphql';
  import { PaginationInput, SortInput } from './index.js';
  
  export function BaseCriteriaInput<TItemsFieldValue>(
    itemsFieldValue: ClassType<TItemsFieldValue>
  ) {
    // `isAbstract` decorator option is mandatory to prevent registering in schema
    @InputType({ isAbstract: true })
    abstract class CriteriaInputClass {
      @Field(() => itemsFieldValue, { nullable: true })
      @IsNotEmpty()
      @IsObject()
      @IsNotEmptyObject()
      @ValidateNested()
      filter?: TItemsFieldValue;
  
      @Field(() => [SortInput], { nullable: true })
      @IsNotEmpty()
      @IsArray()
      @ValidateNested({ each: true })
      @IsObject({ each: true })
      sort?: SortInput[];
  
      @Field(() => PaginationInput, { nullable: false })
      @IsNotEmpty()
      @IsObject()
      @IsNotEmptyObject()
      @ValidateNested()
      paginate!: PaginationInput;
    }
    return CriteriaInputClass;
  }
  