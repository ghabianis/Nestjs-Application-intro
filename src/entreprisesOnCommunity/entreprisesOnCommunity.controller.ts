import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EntreprisesOnCommunityService } from "./entreprisesOnCommunity.service";
import { EntreprisesOnCommunityControllerBase } from "./base/entreprisesOnCommunity.controller.base";

@swagger.ApiTags("entreprises-on-communities")
@common.Controller("entreprises-on-communities")
export class EntreprisesOnCommunityController extends EntreprisesOnCommunityControllerBase {
  constructor(
    protected readonly service: EntreprisesOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
