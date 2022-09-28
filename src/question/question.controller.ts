import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { QuestionService } from "./question.service";
import { QuestionControllerBase } from "./base/question.controller.base";

@swagger.ApiTags("questions")
@common.Controller("questions")
export class QuestionController extends QuestionControllerBase {
  constructor(
    protected readonly service: QuestionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
