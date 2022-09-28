import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { UsersOnEntrepriseModuleBase } from "./base/usersOnEntreprise.module.base";
import { UsersOnEntrepriseService } from "./usersOnEntreprise.service";
import { UsersOnEntrepriseController } from "./usersOnEntreprise.controller";
import { UsersOnEntrepriseResolver } from "./usersOnEntreprise.resolver";

@Module({
  imports: [UsersOnEntrepriseModuleBase],
  controllers: [UsersOnEntrepriseController],
  providers: [UsersOnEntrepriseService, UsersOnEntrepriseResolver, DbService],
  exports: [UsersOnEntrepriseService],
})
export class UsersOnEntrepriseModule {}
