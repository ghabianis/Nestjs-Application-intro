import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ChatServiceBase } from "./base/chat.service.base";

@Injectable()
export class ChatService extends ChatServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
