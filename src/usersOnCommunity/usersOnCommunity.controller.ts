import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UsersOnCommunityService } from "./usersOnCommunity.service";
import { UsersOnCommunityControllerBase } from "./base/usersOnCommunity.controller.base";
import { Community } from "src/community/base/Community";
import { Publication } from "src/publication/base/Publication";
import { PublicationsOnCommunity } from "src/publicationsOnCommunity/base/PublicationsOnCommunity";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";


@swagger.ApiTags("users-on-communities")
@common.Controller("users-on-communities")
export class UsersOnCommunityController extends UsersOnCommunityControllerBase {
  constructor(
    protected readonly service: UsersOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }


   // Enrolled Offers notification API
   @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("communityPostsWithLikedPosts/:id")
  async allPostsOnCommunityWithLikedPosts(
    @common.Param('id') id : string,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PublicationsOnCommunity",
    });
    const resp = await this.service.allPostsOnCommunityWithLikedPosts(id);
    return [resp];
  }


}
