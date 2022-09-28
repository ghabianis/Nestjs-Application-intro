import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { SocialinterractionModuleBase } from "./base/socialinterraction.module.base";
import { SocialinterractionService } from "./socialinterraction.service";
import { SocialinterractionController } from "./socialinterraction.controller";
import { SocialinterractionResolver } from "./socialinterraction.resolver";

@Module({
  imports: [SocialinterractionModuleBase],
  controllers: [SocialinterractionController],
  providers: [SocialinterractionService, SocialinterractionResolver, DbService],
  exports: [SocialinterractionService],
})
export class SocialinterractionModule {}
