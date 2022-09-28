import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CandidateResolverBase } from "./base/candidate.resolver.base";
import { Candidate } from "./base/Candidate";
import { CandidateService } from "./candidate.service";

@graphql.Resolver(() => Candidate)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class CandidateResolver extends CandidateResolverBase {
  constructor(
    protected readonly service: CandidateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
