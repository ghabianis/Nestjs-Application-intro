import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ContractsOnCandidateService } from "./contractsOnCandidate.service";
import { ContractsOnCandidateControllerBase } from "./base/contractsOnCandidate.controller.base";

@swagger.ApiTags("contracts-on-candidates")
@common.Controller("contracts-on-candidates")
export class ContractsOnCandidateController extends ContractsOnCandidateControllerBase {
  constructor(
    protected readonly service: ContractsOnCandidateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
