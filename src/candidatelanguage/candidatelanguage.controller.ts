import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CandidateslanguageService } from "./candidatelanguage.service";

@swagger.ApiTags("candidates-language")
@common.Controller("candidates-language")
export class CandidateslanguageController  {
  constructor(
    protected readonly service: CandidateslanguageService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
   
  }
}
