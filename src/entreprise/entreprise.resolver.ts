import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { EntrepriseResolverBase } from "./base/entreprise.resolver.base";
import { Entreprise } from "./base/Entreprise";
import { EntrepriseService } from "./entreprise.service";

@graphql.Resolver(() => Entreprise)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class EntrepriseResolver extends EntrepriseResolverBase {
  constructor(
    protected readonly service: EntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
