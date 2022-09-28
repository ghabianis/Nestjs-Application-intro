import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SocialinterractionResolverBase } from "./base/socialinterraction.resolver.base";
import { Socialinterraction } from "./base/Socialinterraction";
import { SocialinterractionService } from "./socialinterraction.service";

@graphql.Resolver(() => Socialinterraction)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SocialinterractionResolver extends SocialinterractionResolverBase {
  constructor(
    protected readonly service: SocialinterractionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
