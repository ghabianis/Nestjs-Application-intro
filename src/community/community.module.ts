import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CommunityModuleBase } from "./base/community.module.base";
import { CommunityService } from "./community.service";
import { CommunityController } from "./community.controller";
import { CommunityResolver } from "./community.resolver";

@Module({
  imports: [CommunityModuleBase],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityResolver, DbService],
  exports: [CommunityService],
})
export class CommunityModule {}
