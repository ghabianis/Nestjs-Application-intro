import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CommunityService } from "./community.service";
import { CommunityControllerBase } from "./base/community.controller.base";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { getListCommunityDto } from "./base/getListCommunity.dto";
import { ListCommunityPosts } from "./base/ListCommunityPosts.dto";
import { CommunityFindManyArgs } from "./base/CommunityFindManyArgs";
import { plainToClass } from "class-transformer";
import { Request } from "express";
import { CommunityWhereUniqueInput } from "./base/CommunityWhereUniqueInput";
import { Param } from "@nestjs/common";
import { CommunityPostsFindManyArgs } from "./base/CommunityPostsFindManyArgs";
@swagger.ApiTags("communities")
@common.Controller("communities")
export class CommunityController extends CommunityControllerBase {
  constructor(
    protected readonly service: CommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  // get Community Posts from community posts view
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("GetCommunityPosts")
  @swagger.ApiOkResponse({ type: ListCommunityPosts })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => CommunityPostsFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetCommunityPosts(
    
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(CommunityPostsFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Candidate",
    });
    const resp = await this.service.geCommunityPosts({
      ...args
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );


    return { paginatedResult: result, totalCount: resp.totalCount };
  }
}


