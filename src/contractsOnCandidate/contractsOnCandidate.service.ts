import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ContractsOnCandidateServiceBase } from "./base/contractsOnCandidate.service.base";

@Injectable()
export class ContractsOnCandidateService extends ContractsOnCandidateServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
