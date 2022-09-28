import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { PublicationService } from "./publication.service";
import { PublicationControllerBase } from "./base/publication.controller.base";

@swagger.ApiTags("publications")
@common.Controller("publications")
export class PublicationController extends PublicationControllerBase {
  constructor(
    protected readonly service: PublicationService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
