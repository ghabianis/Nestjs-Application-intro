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
import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OffersOnCommunity } from "../../offersOnCommunity/base/OffersOnCommunity";
import { PublicationsOnCommunity } from "../../publicationsOnCommunity/base/PublicationsOnCommunity";
import { UsersOnCommunity } from "../../usersOnCommunity/base/UsersOnCommunity";
import { EntreprisesOnCommunity } from "../../entreprisesOnCommunity/base/EntreprisesOnCommunity";
@ObjectType()
class Community {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  @IsOptional()
  updatedAt?: Date | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  activityField!: string | null;

  @ApiProperty({
    required: false,
    type: () => [OffersOnCommunity],
  })
  @ValidateNested()
  @Type(() => OffersOnCommunity)
  @IsOptional()
  offersOnCommunities?: Array<OffersOnCommunity>;

  @ApiProperty({
    required: false,
    type: () => [PublicationsOnCommunity],
  })
  @ValidateNested()
  @Type(() => PublicationsOnCommunity)
  @IsOptional()
  publicationsOnCommunities?: Array<PublicationsOnCommunity>;

  @ApiProperty({
    required: false,
    type: () => [UsersOnCommunity],
  })
  @ValidateNested()
  @Type(() => UsersOnCommunity)
  @IsOptional()
  usersOnCommunities?: Array<UsersOnCommunity>;

  @ApiProperty({
    required: false,
    type: () => [EntreprisesOnCommunity],
  })
  @ValidateNested()
  @Type(() => EntreprisesOnCommunity)
  @IsOptional()
  entreprisesOnCommunities?: Array<EntreprisesOnCommunity>;
}
export { Community };
