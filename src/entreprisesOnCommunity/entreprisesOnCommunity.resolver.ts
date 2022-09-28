import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EntreprisesOnCommunityResolverBase } from "./base/entreprisesOnCommunity.resolver.base";
import { EntreprisesOnCommunity } from "./base/EntreprisesOnCommunity";
import { EntreprisesOnCommunityService } from "./entreprisesOnCommunity.service";

@graphql.Resolver(() => EntreprisesOnCommunity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class EntreprisesOnCommunityResolver extends EntreprisesOnCommunityResolverBase {
  constructor(
    protected readonly service: EntreprisesOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
