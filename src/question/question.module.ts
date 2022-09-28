import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { QuestionModuleBase } from "./base/question.module.base";
import { QuestionService } from "./question.service";
import { QuestionController } from "./question.controller";
import { QuestionResolver } from "./question.resolver";

@Module({
  imports: [QuestionModuleBase],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionResolver, DbService],
  exports: [QuestionService],
})
export class QuestionModule {}
