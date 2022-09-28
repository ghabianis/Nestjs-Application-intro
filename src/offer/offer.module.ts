import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { OfferModuleBase } from "./base/offer.module.base";
import { OfferService } from "./offer.service";
import { OfferController } from "./offer.controller";
import { OfferResolver } from "./offer.resolver";

@Module({
  imports: [OfferModuleBase],
  controllers: [OfferController],
  providers: [OfferService, OfferResolver, DbService],
  exports: [OfferService],
})
export class OfferModule {}
