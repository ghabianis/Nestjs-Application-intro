import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { UsersSkillModuleBase } from "./base/usersSkill.module.base";
import { UsersSkillService } from "./usersSkill.service";
import { UsersSkillController } from "./usersSkill.controller";
import { UsersSkillResolver } from "./usersSkill.resolver";

@Module({
  imports: [UsersSkillModuleBase],
  controllers: [UsersSkillController],
  providers: [UsersSkillService, UsersSkillResolver, DbService],
  exports: [UsersSkillService],
})
export class UsersSkillModule {}
