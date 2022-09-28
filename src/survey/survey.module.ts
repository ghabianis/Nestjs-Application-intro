import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { SurveyModuleBase } from "./base/survey.module.base";
import { SurveyService } from "./survey.service";
import { SurveyController } from "./survey.controller";
import { SurveyResolver } from "./survey.resolver";

@Module({
  imports: [SurveyModuleBase],
  controllers: [SurveyController],
  providers: [SurveyService, SurveyResolver, DbService],
  exports: [SurveyService],
})
export class SurveyModule {}
