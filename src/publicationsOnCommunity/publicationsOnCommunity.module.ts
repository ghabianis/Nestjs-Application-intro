import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { PublicationsOnCommunityModuleBase } from "./base/publicationsOnCommunity.module.base";
import { PublicationsOnCommunityService } from "./publicationsOnCommunity.service";
import { PublicationsOnCommunityController } from "./publicationsOnCommunity.controller";
import { PublicationsOnCommunityResolver } from "./publicationsOnCommunity.resolver";

@Module({
  imports: [PublicationsOnCommunityModuleBase],
  controllers: [PublicationsOnCommunityController],
  providers: [
    PublicationsOnCommunityService,
    PublicationsOnCommunityResolver,
    DbService,
  ],
  exports: [PublicationsOnCommunityService],
})
export class PublicationsOnCommunityModule {}
