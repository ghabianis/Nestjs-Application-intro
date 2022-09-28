import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { OffersOnCommunityResolverBase } from "./base/offersOnCommunity.resolver.base";
import { OffersOnCommunity } from "./base/OffersOnCommunity";
import { OffersOnCommunityService } from "./offersOnCommunity.service";

@graphql.Resolver(() => OffersOnCommunity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class OffersOnCommunityResolver extends OffersOnCommunityResolverBase {
  constructor(
    protected readonly service: OffersOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
