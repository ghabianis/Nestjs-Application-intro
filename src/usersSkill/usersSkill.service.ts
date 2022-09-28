import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { UsersSkillServiceBase } from "./base/usersSkill.service.base";

@Injectable()
export class UsersSkillService extends UsersSkillServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
