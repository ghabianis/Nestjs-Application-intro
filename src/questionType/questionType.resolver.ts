import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { QuestionTypeResolverBase } from "./base/questionType.resolver.base";
import { QuestionType } from "./base/QuestionType";
import { QuestionTypeService } from "./questionType.service";

@graphql.Resolver(() => QuestionType)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class QuestionTypeResolver extends QuestionTypeResolverBase {
  constructor(
    protected readonly service: QuestionTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
