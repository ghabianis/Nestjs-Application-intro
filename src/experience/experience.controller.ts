import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ExperienceService } from "./experience.service";
import { ExperienceControllerBase } from "./base/experience.controller.base";

@swagger.ApiTags("experiences")
@common.Controller("experiences")
export class ExperienceController extends ExperienceControllerBase {
  constructor(
    protected readonly service: ExperienceService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
