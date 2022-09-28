import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ChatService } from "./chat.service";
import { ChatControllerBase } from "./base/chat.controller.base";

@swagger.ApiTags("chats")
@common.Controller("chats")
export class ChatController extends ChatControllerBase {
  constructor(
    protected readonly service: ChatService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
