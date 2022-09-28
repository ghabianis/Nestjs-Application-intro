import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UsersOnCommunityResolverBase } from "./base/usersOnCommunity.resolver.base";
import { UsersOnCommunity } from "./base/UsersOnCommunity";
import { UsersOnCommunityService } from "./usersOnCommunity.service";

@graphql.Resolver(() => UsersOnCommunity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UsersOnCommunityResolver extends UsersOnCommunityResolverBase {
  constructor(
    protected readonly service: UsersOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
