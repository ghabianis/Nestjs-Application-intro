import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { VideoResolverBase } from "./base/video.resolver.base";
import { Video } from "./base/Video";
import { VideoService } from "./video.service";

@graphql.Resolver(() => Video)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class VideoResolver extends VideoResolverBase {
  constructor(
    protected readonly service: VideoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
