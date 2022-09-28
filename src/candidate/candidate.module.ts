import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CandidateModuleBase } from "./base/candidate.module.base";
import { CandidateService } from "./candidate.service";
import { CandidateController } from "./candidate.controller";
import { CandidateResolver } from "./candidate.resolver";

@Module({
  imports: [CandidateModuleBase],
  controllers: [CandidateController],
  providers: [CandidateService, CandidateResolver, DbService],
  exports: [CandidateService],
})
export class CandidateModule {}
