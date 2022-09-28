import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { EventModuleBase } from "./base/event.module.base";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { EventResolver } from "./event.resolver";

@Module({
  imports: [EventModuleBase],
  controllers: [EventController],
  providers: [EventService, EventResolver, DbService],
  exports: [EventService],
})
export class EventModule {}
