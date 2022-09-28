import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { ExperienceServiceBase } from "./base/experience.service.base";

@Injectable()
export class ExperienceService extends ExperienceServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
