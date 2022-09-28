import { ObjectType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString, ValidateNested } from "class-validator";
import { Candidate } from "src/candidate/base/Candidate";
import { Language } from "src/language/base/Language";


@ObjectType()
class Candidatelanguage {
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
    type: () => Language,
  })
  @ValidateNested()
  @Type(() => Language)
  @IsOptional()
  language?: Language | null;

  @ApiProperty({
    required: false,
    type: () => Candidate,
  })
  @ValidateNested()
  @Type(() => Candidate)
  @IsOptional()
  candidate?: Candidate | null;

} export { Candidatelanguage }
