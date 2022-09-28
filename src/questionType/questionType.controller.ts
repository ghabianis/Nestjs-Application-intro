import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { QuestionTypeService } from "./questionType.service";
import { QuestionTypeControllerBase } from "./base/questionType.controller.base";

@swagger.ApiTags("question-types")
@common.Controller("question-types")
export class QuestionTypeController extends QuestionTypeControllerBase {
  constructor(
    protected readonly service: QuestionTypeService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
