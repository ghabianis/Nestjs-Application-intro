import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { SurveyResolverBase } from "./base/survey.resolver.base";
import { Survey } from "./base/Survey";
import { SurveyService } from "./survey.service";

@graphql.Resolver(() => Survey)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class SurveyResolver extends SurveyResolverBase {
  constructor(
    protected readonly service: SurveyService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
