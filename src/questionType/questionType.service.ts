import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { QuestionTypeServiceBase } from "./base/questionType.service.base";

@Injectable()
export class QuestionTypeService extends QuestionTypeServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
