import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { EntreprisesOnCommunityModuleBase } from "./base/entreprisesOnCommunity.module.base";
import { EntreprisesOnCommunityService } from "./entreprisesOnCommunity.service";
import { EntreprisesOnCommunityController } from "./entreprisesOnCommunity.controller";
import { EntreprisesOnCommunityResolver } from "./entreprisesOnCommunity.resolver";

@Module({
  imports: [EntreprisesOnCommunityModuleBase],
  controllers: [EntreprisesOnCommunityController],
  providers: [
    EntreprisesOnCommunityService,
    EntreprisesOnCommunityResolver,
    DbService,
  ],
  exports: [EntreprisesOnCommunityService],
})
export class EntreprisesOnCommunityModule {}
