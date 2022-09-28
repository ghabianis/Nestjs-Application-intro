import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { QuestionResolverBase } from "./base/question.resolver.base";
import { Question } from "./base/Question";
import { QuestionService } from "./question.service";

@graphql.Resolver(() => Question)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class QuestionResolver extends QuestionResolverBase {
  constructor(
    protected readonly service: QuestionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
