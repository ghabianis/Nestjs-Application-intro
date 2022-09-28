import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CandidateslanguageController } from "./candidatelanguage.controller";
import { CandidateslanguageService } from "./candidatelanguage.service";


@Module({

  controllers: [CandidateslanguageController],
  providers: [
    CandidateslanguageService,
    DbService,
  ],
  exports: [CandidateslanguageService],
})
export class CandidateslanguageModule {}