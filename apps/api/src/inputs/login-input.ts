import * as TypeGraphQL from "type-graphql";
import { IsNotEmpty, IsString } from "class-validator";

@TypeGraphQL.InputType()
class LoginInput {
  @TypeGraphQL.Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  email!: string;

  @TypeGraphQL.Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export { LoginInput };
