import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { RecruiterResolverBase } from "./base/recruiter.resolver.base";
import { Recruiter } from "./base/Recruiter";
import { RecruiterService } from "./recruiter.service";

@graphql.Resolver(() => Recruiter)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class RecruiterResolver extends RecruiterResolverBase {
  constructor(
    protected readonly service: RecruiterService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
