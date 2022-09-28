import { ApiProperty } from "@nestjs/swagger";
import { InputType, Field } from "@nestjs/graphql";
import { IsString , IsOptional } from "class-validator";

@InputType()
export class Credentials {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  username!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;
}


@InputType()
export class UserCredentials {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  email!: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  role?: string;

  email_confirm: boolean = true;

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
}

@InputType()
export class PasswordDefine {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;

  // @ApiProperty({
  //   required: false,
  //   type: String,
  // })
  // @IsString()
  // @Field(() => String, { nullable: true })
  // oldpassword!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  token!: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  email!: string;
}

@InputType()
export class EmailResetPasswordCredential {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  email!: string;
}


@InputType()
export class ResetPasswordCredential {
  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  access_token!: string;


  @ApiProperty({
    required: true,
    type: String,
  })
  @IsString()
  @Field(() => String, { nullable: false })
  password!: string;
}