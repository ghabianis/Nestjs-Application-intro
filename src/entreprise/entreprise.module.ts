import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { EntrepriseModuleBase } from "./base/entreprise.module.base";
import { EntrepriseService } from "./entreprise.service";
import { EntrepriseController } from "./entreprise.controller";
import { EntrepriseResolver } from "./entreprise.resolver";

@Module({
  imports: [EntrepriseModuleBase],
  controllers: [EntrepriseController],
  providers: [EntrepriseService, EntrepriseResolver, DbService],
  exports: [EntrepriseService],
})
export class EntrepriseModule {}
