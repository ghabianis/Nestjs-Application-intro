import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { UsersOnEntrepriseService } from "./usersOnEntreprise.service";
import { UsersOnEntrepriseControllerBase } from "./base/usersOnEntreprise.controller.base";

@swagger.ApiTags("users-on-entreprises")
@common.Controller("users-on-entreprises")
export class UsersOnEntrepriseController extends UsersOnEntrepriseControllerBase {
  constructor(
    protected readonly service: UsersOnEntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
