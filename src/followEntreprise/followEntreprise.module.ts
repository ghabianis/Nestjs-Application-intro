import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { FollowEntrepriseModuleBase } from "./base/followEntreprise.module.base";
import { FollowEntrepriseService } from "./followEntreprise.service";
import { FollowEntrepriseController } from "./followEntreprise.controller";
import { FollowEntrepriseResolver } from "./followEntreprise.resolver";

@Module({
  imports: [FollowEntrepriseModuleBase],
  controllers: [FollowEntrepriseController],
  providers: [FollowEntrepriseService, FollowEntrepriseResolver, DbService],
  exports: [FollowEntrepriseService],
})
export class FollowEntrepriseModule {}
