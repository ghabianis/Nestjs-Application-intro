import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UsersOnEntrepriseResolverBase } from "./base/usersOnEntreprise.resolver.base";
import { UsersOnEntreprise } from "./base/UsersOnEntreprise";
import { UsersOnEntrepriseService } from "./usersOnEntreprise.service";

@graphql.Resolver(() => UsersOnEntreprise)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UsersOnEntrepriseResolver extends UsersOnEntrepriseResolverBase {
  constructor(
    protected readonly service: UsersOnEntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
