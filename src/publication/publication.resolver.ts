import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { PublicationResolverBase } from "./base/publication.resolver.base";
import { Publication } from "./base/Publication";
import { PublicationService } from "./publication.service";

@graphql.Resolver(() => Publication)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class PublicationResolver extends PublicationResolverBase {
  constructor(
    protected readonly service: PublicationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
