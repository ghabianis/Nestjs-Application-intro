import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CommentServiceBase } from "./base/comment.service.base";

@Injectable()
export class CommentService extends CommentServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
