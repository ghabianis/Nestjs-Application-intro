import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { CandidatesOnChatroomResolverBase } from "./base/candidatesOnChatroom.resolver.base";
import { CandidatesOnChatroom } from "./base/CandidatesOnChatroom";
import { CandidatesOnChatroomService } from "./candidatesOnChatroom.service";

@graphql.Resolver(() => CandidatesOnChatroom)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class CandidatesOnChatroomResolver extends CandidatesOnChatroomResolverBase {
  constructor(
    protected readonly service: CandidatesOnChatroomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
