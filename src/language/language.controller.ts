import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { LanguageService } from "./language.service";

@swagger.ApiTags("language")
@common.Controller("language")
export class LanguageController {
  constructor(
    protected readonly service: LanguageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}
}