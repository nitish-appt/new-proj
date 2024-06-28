import { ValidationError } from "class-validator";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { TypeORMError } from "typeorm";
import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4/index.js";
import * as TypeGraphQL from "type-graphql";


export type Maybe<T> = T | null | undefined;

export type Nullable<T> = T | null;

export type Dict<T> = {
    [key: string]: T;
};

export type ApolloServerContext = {
    token?: string;
};


export type ValidationsType = {
    propertyName: string;
    description:
      | {
          [type: string]: string;
        }
      | undefined;
    children: ValidationError[] | undefined;
};
  
export type CustomErrorType = {
    readonly validations?: ValidationsType[] | string;
    readonly code?: Date | number;
};
  
export type FormattedErrorType = GraphQLFormattedError & CustomErrorType;
  
export type ErrorType = TypeORMError | GraphQLError | Error;
  
export type ErrorMap = {
    CommonError: (error: ErrorType) => FormattedErrorType;
    GraphQLError: (error: GraphQLError) => FormattedErrorType;
};

export type Context = {
  req: ExpressContextFunctionArgument;
};

@TypeGraphQL.ObjectType()
  export class LoginOutput {
    @TypeGraphQL.Field(() => String)
    accessToken!: string;
}

