import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { JobService } from "./job.service";
import { JobControllerBase } from "./base/job.controller.base";

@swagger.ApiTags("jobs")
@common.Controller("jobs")
export class JobController extends JobControllerBase {
  constructor(
    protected readonly service: JobService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
