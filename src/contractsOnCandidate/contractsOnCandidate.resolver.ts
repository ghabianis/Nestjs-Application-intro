import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ContractsOnCandidateResolverBase } from "./base/contractsOnCandidate.resolver.base";
import { ContractsOnCandidate } from "./base/ContractsOnCandidate";
import { ContractsOnCandidateService } from "./contractsOnCandidate.service";

@graphql.Resolver(() => ContractsOnCandidate)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ContractsOnCandidateResolver extends ContractsOnCandidateResolverBase {
  constructor(
    protected readonly service: ContractsOnCandidateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
