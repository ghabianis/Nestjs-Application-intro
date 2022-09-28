import { InputType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, ValidateNested ,IsNumber,IsInt , IsEnum} from "class-validator";
import { Type } from "class-transformer";
import { EnumUserSex } from "./registerEnumType";
import { SkillWhereInput } from "src/skill/base/SkillWhereInput";
import { SkillWhereUniqueInput } from "src/skill/base/SkillWhereUniqueInput";
import { UsersSkill } from "src/usersSkill/base/UsersSkill";


@InputType()
class UpdateUserInput {
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  firstName?: string | null;

  
  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  lastName?: string | null;

  // @ApiProperty({
  //   required: true,
  //   type: String,
  // })
  // @IsString()
  // @Field(() => String)
  // username!: string;

//   @ApiProperty({
//     required: true,
//     type: String,
//   })
//   @IsString()
//   @Field(() => String)
//   password!: string;

  // @ApiProperty({
  //   required: true,
  //   type: [String],
  // })
  // @IsString({
  //   each: true,
  // })
  // @Field(() => [String])
  // roles!: Array<string>;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: false,
  })
  email!: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, {
    nullable: true,
  })
  phone?: string | null;

  // @ApiProperty({
  //   required: false,
  //   type: String,
  // })
  // @IsString()
  // @IsOptional()
  // @Field(() => String, {
  //   nullable: true,
  // })
  // address?: string | null;

  @ApiProperty({
    required: true,
    enum: EnumUserSex,
  })
  @IsEnum(EnumUserSex)
  @Field(() => EnumUserSex, {
    nullable: false,
  })
  sex!: "Homme" | "Femme" ;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String)
  city?: string;

  @ApiProperty({
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  @Field(() => String)
  kmRadius?: string;


//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   activityField?: string | null;

//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   wantedPost?: string | null;

//   // @ApiProperty({
//   //   required: false,
//   //   type: Number,
//   // })
//   // @IsInt()
//   // @IsOptional()
//   // @Field(() => Number, {
//   //   nullable: true,
//   // })
//   // experiencesYears?: number | null;

//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   languages?: string | null;

//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   tags?: string | null;

//   @ApiProperty({
//     required: false,
//     type: Number,
//   })
//   @IsNumber()
//   @IsOptional()
//   @Field(() => Number, {
//     nullable: true,
//   })
//   maxSalary?: number | null;

//   @ApiProperty({
//     required: false,
//     type: Number,
//   })
//   @IsNumber()
//   @IsOptional()
//   @Field(() => Number, {
//     nullable: true,
//   })
//   minSalary?: number | null;

//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   personalCv?: string | null;

//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   mediaLink?: string | null;
  
//   @ApiProperty({
//     required: false,
//     type: String,
//   })
//   @IsString()
//   @IsOptional()
//   @Field(() => String, {
//     nullable: true,
//   })
//   userId?: string | null;

//   @ApiProperty({
//     required: false,
//     type: () => [SkillWhereUniqueInput],
//   })
//   @ValidateNested()
//   @Type(() => SkillWhereUniqueInput)
//   @IsOptional()
//   usersSkills?: Array<SkillWhereUniqueInput>;
}

export { UpdateUserInput }

