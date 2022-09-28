import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { StoryResolverBase } from "./base/story.resolver.base";
import { Story } from "./base/Story";
import { StoryService } from "./story.service";

@graphql.Resolver(() => Story)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class StoryResolver extends StoryResolverBase {
  constructor(
    protected readonly service: StoryService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
