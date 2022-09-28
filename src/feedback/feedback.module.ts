import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { FeedbackModuleBase } from "./base/feedback.module.base";
import { FeedbackService } from "./feedback.service";
import { FeedbackController } from "./feedback.controller";
import { FeedbackResolver } from "./feedback.resolver";

@Module({
  imports: [FeedbackModuleBase],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackResolver, DbService],
  exports: [FeedbackService],
})
export class FeedbackModule {}
