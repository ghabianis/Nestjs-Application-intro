import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { SkillServiceBase } from "./base/skill.service.base";

@Injectable()
export class SkillService extends SkillServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
