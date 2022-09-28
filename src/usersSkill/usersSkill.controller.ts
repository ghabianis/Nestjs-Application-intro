import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UsersSkillService } from "./usersSkill.service";
import { UsersSkillControllerBase } from "./base/usersSkill.controller.base";

@swagger.ApiTags("users-skills")
@common.Controller("users-skills")
export class UsersSkillController extends UsersSkillControllerBase {
  constructor(
    protected readonly service: UsersSkillService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
