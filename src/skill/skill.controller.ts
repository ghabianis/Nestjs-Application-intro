import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SkillService } from "./skill.service";
import { SkillControllerBase } from "./base/skill.controller.base";

@swagger.ApiTags("skills")
@common.Controller("skills")
export class SkillController extends SkillControllerBase {
  constructor(
    protected readonly service: SkillService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
