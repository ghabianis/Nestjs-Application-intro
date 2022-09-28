import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { ChatroomModuleBase } from "./base/chatroom.module.base";
import { ChatroomService } from "./chatroom.service";
import { ChatroomController } from "./chatroom.controller";
import { ChatroomResolver } from "./chatroom.resolver";

@Module({
  imports: [ChatroomModuleBase],
  controllers: [ChatroomController],
  providers: [ChatroomService, ChatroomResolver, DbService],
  exports: [ChatroomService],
})
export class ChatroomModule {}
