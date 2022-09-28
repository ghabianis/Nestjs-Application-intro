import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { FollowEntrepriseResolverBase } from "./base/followEntreprise.resolver.base";
import { FollowEntreprise } from "./base/FollowEntreprise";
import { FollowEntrepriseService } from "./followEntreprise.service";

@graphql.Resolver(() => FollowEntreprise)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class FollowEntrepriseResolver extends FollowEntrepriseResolverBase {
  constructor(
    protected readonly service: FollowEntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
