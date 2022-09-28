import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CandidatesOnChatroomModuleBase } from "./base/candidatesOnChatroom.module.base";
import { CandidatesOnChatroomService } from "./candidatesOnChatroom.service";
import { CandidatesOnChatroomController } from "./candidatesOnChatroom.controller";
import { CandidatesOnChatroomResolver } from "./candidatesOnChatroom.resolver";

@Module({
  imports: [CandidatesOnChatroomModuleBase],
  controllers: [CandidatesOnChatroomController],
  providers: [
    CandidatesOnChatroomService,
    CandidatesOnChatroomResolver,
    DbService,
  ],
  exports: [CandidatesOnChatroomService],
})
export class CandidatesOnChatroomModule {}
