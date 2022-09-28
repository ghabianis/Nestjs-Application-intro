import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { SurveyServiceBase } from "./base/survey.service.base";

@Injectable()
export class SurveyService extends SurveyServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
