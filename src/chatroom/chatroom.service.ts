import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ChatroomServiceBase } from "./base/chatroom.service.base";

@Injectable()
export class ChatroomService extends ChatroomServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
