import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CityModuleBase } from "./base/city.module.base";
import { CityService } from "./city.service";
import { CityController } from "./city.controller";
import { CityResolver } from "./city.resolver";

@Module({
  imports: [CityModuleBase],
  controllers: [CityController],
  providers: [CityService, CityResolver, DbService],
  exports: [CityService],
})
export class CityModule {}
