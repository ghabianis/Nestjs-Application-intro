import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { UsersOnCommunityModuleBase } from "./base/usersOnCommunity.module.base";
import { UsersOnCommunityService } from "./usersOnCommunity.service";
import { UsersOnCommunityController } from "./usersOnCommunity.controller";
import { UsersOnCommunityResolver } from "./usersOnCommunity.resolver";

@Module({
  imports: [UsersOnCommunityModuleBase],
  controllers: [UsersOnCommunityController],
  providers: [UsersOnCommunityService, UsersOnCommunityResolver, DbService],
  exports: [UsersOnCommunityService],
})
export class UsersOnCommunityModule {}
