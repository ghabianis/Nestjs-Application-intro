import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ChatroomResolverBase } from "./base/chatroom.resolver.base";
import { Chatroom } from "./base/Chatroom";
import { ChatroomService } from "./chatroom.service";

@graphql.Resolver(() => Chatroom)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ChatroomResolver extends ChatroomResolverBase {
  constructor(
    protected readonly service: ChatroomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
