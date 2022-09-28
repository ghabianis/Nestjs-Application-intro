import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { OffersOnCommunityModuleBase } from "./base/offersOnCommunity.module.base";
import { OffersOnCommunityService } from "./offersOnCommunity.service";
import { OffersOnCommunityController } from "./offersOnCommunity.controller";
import { OffersOnCommunityResolver } from "./offersOnCommunity.resolver";

@Module({
  imports: [OffersOnCommunityModuleBase],
  controllers: [OffersOnCommunityController],
  providers: [OffersOnCommunityService, OffersOnCommunityResolver, DbService],
  exports: [OffersOnCommunityService],
})
export class OffersOnCommunityModule {}
