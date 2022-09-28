import { Module } from "@nestjs/common";
import { UserModuleBase } from "./base/user.module.base";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserResolver } from "./user.resolver";
import { DbService } from "src/dbService/db.service";

@Module({
  imports: [UserModuleBase],
  controllers: [UserController],
  providers: [UserService, UserResolver, DbService],
  exports: [UserService],
})
export class UserModule {}
