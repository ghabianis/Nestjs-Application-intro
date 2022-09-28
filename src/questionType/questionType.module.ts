import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { QuestionTypeModuleBase } from "./base/questionType.module.base";
import { QuestionTypeService } from "./questionType.service";
import { QuestionTypeController } from "./questionType.controller";
import { QuestionTypeResolver } from "./questionType.resolver";

@Module({
  imports: [QuestionTypeModuleBase],
  controllers: [QuestionTypeController],
  providers: [QuestionTypeService, QuestionTypeResolver, DbService],
  exports: [QuestionTypeService],
})
export class QuestionTypeModule {}
