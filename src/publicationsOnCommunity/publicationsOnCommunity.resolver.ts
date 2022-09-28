import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PublicationsOnCommunityResolverBase } from "./base/publicationsOnCommunity.resolver.base";
import { PublicationsOnCommunity } from "./base/PublicationsOnCommunity";
import { PublicationsOnCommunityService } from "./publicationsOnCommunity.service";

@graphql.Resolver(() => PublicationsOnCommunity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PublicationsOnCommunityResolver extends PublicationsOnCommunityResolverBase {
  constructor(
    protected readonly service: PublicationsOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
