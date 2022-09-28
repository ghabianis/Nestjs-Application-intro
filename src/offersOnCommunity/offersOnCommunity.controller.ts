import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OffersOnCommunityService } from "./offersOnCommunity.service";
import { OffersOnCommunityControllerBase } from "./base/offersOnCommunity.controller.base";

@swagger.ApiTags("offers-on-communities")
@common.Controller("offers-on-communities")
export class OffersOnCommunityController extends OffersOnCommunityControllerBase {
  constructor(
    protected readonly service: OffersOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
