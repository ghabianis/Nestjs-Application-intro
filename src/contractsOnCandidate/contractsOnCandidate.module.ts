import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { ContractsOnCandidateModuleBase } from "./base/contractsOnCandidate.module.base";
import { ContractsOnCandidateService } from "./contractsOnCandidate.service";
import { ContractsOnCandidateController } from "./contractsOnCandidate.controller";
import { ContractsOnCandidateResolver } from "./contractsOnCandidate.resolver";

@Module({
  imports: [ContractsOnCandidateModuleBase],
  controllers: [ContractsOnCandidateController],
  providers: [
    ContractsOnCandidateService,
    ContractsOnCandidateResolver,
    DbService,
  ],
  exports: [ContractsOnCandidateService],
})
export class ContractsOnCandidateModule {}
