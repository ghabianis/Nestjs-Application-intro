import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ContractServiceBase } from "./base/contract.service.base";

@Injectable()
export class ContractService extends ContractServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
