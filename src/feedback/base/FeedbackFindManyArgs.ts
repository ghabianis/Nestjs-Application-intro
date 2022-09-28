/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { FeedbackWhereInput } from "./FeedbackWhereInput";
import { Type } from "class-transformer";
import { FeedbackOrderByInput } from "./FeedbackOrderByInput";

@ArgsType()
class FeedbackFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => FeedbackWhereInput,
  })
  @Field(() => FeedbackWhereInput, { nullable: true })
  @Type(() => FeedbackWhereInput)
  where?: FeedbackWhereInput;

  @ApiProperty({
    required: false,
    type: FeedbackOrderByInput,
  })
  @Field(() => FeedbackOrderByInput, { nullable: true })
  @Type(() => FeedbackOrderByInput)
  orderBy?: FeedbackOrderByInput;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { FeedbackFindManyArgs };
