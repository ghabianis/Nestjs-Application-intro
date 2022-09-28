import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PublicationsOnCommunityService } from "./publicationsOnCommunity.service";
import { PublicationsOnCommunityControllerBase } from "./base/publicationsOnCommunity.controller.base";

@swagger.ApiTags("publications-on-communities")
@common.Controller("publications-on-communities")
export class PublicationsOnCommunityController extends PublicationsOnCommunityControllerBase {
  constructor(
    protected readonly service: PublicationsOnCommunityService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
