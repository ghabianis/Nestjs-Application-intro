import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { CityService } from "./city.service";
import { CityControllerBase } from "./base/city.controller.base";

@swagger.ApiTags("cities")
@common.Controller("cities")
export class CityController extends CityControllerBase {
  constructor(
    protected readonly service: CityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
