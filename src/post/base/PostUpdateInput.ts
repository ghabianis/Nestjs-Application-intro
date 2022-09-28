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
import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested } from "class-validator";
import { PublicationWhereUniqueInput } from "../../publication/base/PublicationWhereUniqueInput";
import { Type } from "class-transformer";
import { EntrepriseWhereUniqueInput } from "../../entreprise/base/EntrepriseWhereUniqueInput";
import { PublicationUpdateInput } from "src/publication/base/PublicationUpdateInput";
@InputType()
class PostUpdateInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  image?: string | null;

  @ApiProperty({
    required: false,
    type: () => PublicationUpdateInput,
  })
  @ValidateNested()
  @Type(() => PublicationUpdateInput)
  @IsOptional()
  @Field(() => PublicationUpdateInput, {
    nullable: true,
  })
  publication?: PublicationUpdateInput;

  @ApiProperty({
    required: false,
    type: () => EntrepriseWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => EntrepriseWhereUniqueInput)
  @IsOptional()
  @Field(() => EntrepriseWhereUniqueInput, {
    nullable: true,
  })
  entreprise?: EntrepriseWhereUniqueInput | null;
}
export { PostUpdateInput };