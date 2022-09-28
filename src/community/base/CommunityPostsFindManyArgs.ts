import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { CommunityWhereInput } from "./CommunityWhereInput";
import { Type } from "class-transformer";
import { CommunityOrderByInput } from "./CommunityOrderByInput";
import { CommunityWhereUniqueInput } from "./CommunityWhereUniqueInput";
import { CommunityPostsWhereUniqueInput } from "./CommunityPostsWhereUniquzInput";

@ArgsType()
class CommunityPostsFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => CommunityPostsWhereUniqueInput,
  })
  @Field(() => CommunityPostsWhereUniqueInput, { nullable: true })
  @Type(() => CommunityPostsWhereUniqueInput)
  where?: CommunityPostsWhereUniqueInput;



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

export { CommunityPostsFindManyArgs };