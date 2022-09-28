import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { FeedbackResolverBase } from "./base/feedback.resolver.base";
import { Feedback } from "./base/Feedback";
import { FeedbackService } from "./feedback.service";

@graphql.Resolver(() => Feedback)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class FeedbackResolver extends FeedbackResolverBase {
  constructor(
    protected readonly service: FeedbackService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
