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
import { Candidate } from "../../candidate/base/Candidate";
import { ValidateNested, IsOptional, IsDate, IsString } from "class-validator";
import { Type } from "class-transformer";
import { Contract } from "../../contract/base/Contract";
@ObjectType()
class ContractsOnCandidate {
  @ApiProperty({
    required: false,
    type: () => Candidate,
  })
  @ValidateNested()
  @Type(() => Candidate)
  @IsOptional()
  candidate?: Candidate | null;

  @ApiProperty({
    required: false,
    type: () => Contract,
  })
  @ValidateNested()
  @Type(() => Contract)
  @IsOptional()
  contract?: Contract | null;

  @ApiProperty({
    required: true,
  })
  @IsDate()
  @Type(() => Date)
  @Field(() => Date)
  createdAt!: Date;

  @ApiProperty({
    required: true,
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
  @IsOptional()
  @Field(() => Date, {
    nullable: true,
  })
  updatedAt!: Date | null;
}
export { ContractsOnCandidate };
