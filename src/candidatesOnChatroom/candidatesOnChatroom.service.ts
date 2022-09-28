import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CandidatesOnChatroomServiceBase } from "./base/candidatesOnChatroom.service.base";

@Injectable()
export class CandidatesOnChatroomService extends CandidatesOnChatroomServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
