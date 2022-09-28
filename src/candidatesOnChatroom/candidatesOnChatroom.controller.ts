import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CandidatesOnChatroomService } from "./candidatesOnChatroom.service";
import { CandidatesOnChatroomControllerBase } from "./base/candidatesOnChatroom.controller.base";

@swagger.ApiTags("candidates-on-chatrooms")
@common.Controller("candidates-on-chatrooms")
export class CandidatesOnChatroomController extends CandidatesOnChatroomControllerBase {
  constructor(
    protected readonly service: CandidatesOnChatroomService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
