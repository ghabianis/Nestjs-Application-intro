import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";


@ObjectType()
class Language {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Field(() => String)
  id!: string;

  @ApiProperty({
    required: false,
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
  updatedAt?: Date | null;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @Field(() => String)
  name?: string;

} export { Language }
