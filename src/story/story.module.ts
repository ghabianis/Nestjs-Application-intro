import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { StoryModuleBase } from "./base/story.module.base";
import { StoryService } from "./story.service";
import { StoryController } from "./story.controller";
import { StoryResolver } from "./story.resolver";

@Module({
  imports: [StoryModuleBase],
  controllers: [StoryController],
  providers: [StoryService, StoryResolver, DbService],
  exports: [StoryService],
})
export class StoryModule {}
