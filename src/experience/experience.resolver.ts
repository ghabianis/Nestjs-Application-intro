import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ExperienceResolverBase } from "./base/experience.resolver.base";
import { Experience } from "./base/Experience";
import { ExperienceService } from "./experience.service";

@graphql.Resolver(() => Experience)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ExperienceResolver extends ExperienceResolverBase {
  constructor(
    protected readonly service: ExperienceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
