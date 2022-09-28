import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { RecruiterService } from "./recruiter.service";
import { RecruiterControllerBase } from "./base/recruiter.controller.base";
import { Body, CACHE_MANAGER, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";

import {
  PasswordDefine,
  UserCredentials,
} from "../auth/Credentials";
import { plainToClass } from "class-transformer";
import { Request } from "express";

import { PasswordService } from "src/auth/password.service";
import { User } from "src/user/base/User";
@swagger.ApiTags("recruiters")
@common.Controller("recruiters")
export class RecruiterController extends RecruiterControllerBase {
  constructor(
    protected readonly service: RecruiterService,
    protected readonly passwordService: PasswordService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @Post("create_recruiter")
  //Create a empty password and send him an email that contain his password hashed
  async signUp(@Body() body: UserCredentials) {
    if (body.role === 'recruiter_role') {
      body.password = ""
      body.email_confirm = false;
      const Token = await this.passwordService.hash(body.email);
      this.sendMail(body.email, Token)
    }
    return await this.service.signUp(body);
  }
  //Send an email contain hashed password to the  created user 
  @Post('send_mail')
  async sendMail(email: string, token: string) {
    await this.service.sendAnEmail(email, token);
  }


  //Update created user password depending on the hashed email
  @common.Put('updateUserPassword')
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => PasswordDefine,
    style: "deepObject",
    explode: true,
  })
  async updateUserPassword(@common.Req() request: Request) {
    const args = plainToClass(PasswordDefine, request.query);
    await this.service.updateUserPassword(args);
  }
}
