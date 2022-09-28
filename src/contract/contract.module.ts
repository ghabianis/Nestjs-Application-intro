import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { ContractModuleBase } from "./base/contract.module.base";
import { ContractService } from "./contract.service";
import { ContractController } from "./contract.controller";
import { ContractResolver } from "./contract.resolver";

@Module({
  imports: [ContractModuleBase],
  controllers: [ContractController],
  providers: [ContractService, ContractResolver, DbService],
  exports: [ContractService],
})
export class ContractModule {}
