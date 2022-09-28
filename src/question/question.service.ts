import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { QuestionServiceBase } from "./base/question.service.base";

@Injectable()
export class QuestionService extends QuestionServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
