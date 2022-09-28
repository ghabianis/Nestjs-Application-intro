import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsDate, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { OffersOnCommunity } from "../../offersOnCommunity/base/OffersOnCommunity";
import { PublicationsOnCommunity } from "../../publicationsOnCommunity/base/PublicationsOnCommunity";
import { UsersOnCommunity } from "../../usersOnCommunity/base/UsersOnCommunity";
import { EntreprisesOnCommunity } from "../../entreprisesOnCommunity/base/EntreprisesOnCommunity";
@ObjectType()
class CommunityPosts {
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
    required: false,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  @IsOptional()
  deletedAt?: Date | null;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String)
  username!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  title?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  communityName?: string | null;


  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  entrepriseName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  candidatName?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  description?: string | null;


  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  likes?: number;


  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  shares?: number;

  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  comments?: number;


  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  views?: number;



  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  followers?: number;




  @ApiProperty({
    required: true,
    type: Number,
  })
  @IsString()
  @IsOptional()
  @Type(() => Number)
  isLike?: number;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  publicationId?: string | null;


  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  userId?: string | null;



  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  entrepriseId?: string | null;


  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  candidateId?: string | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  communityId?: string | null;
  
}
export { CommunityPosts}