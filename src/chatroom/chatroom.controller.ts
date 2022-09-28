import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ChatroomService } from "./chatroom.service";
import { ChatroomControllerBase } from "./base/chatroom.controller.base";

@swagger.ApiTags("chatrooms")
@common.Controller("chatrooms")
export class ChatroomController extends ChatroomControllerBase {
  constructor(
    protected readonly service: ChatroomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
