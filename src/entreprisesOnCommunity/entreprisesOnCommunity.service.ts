import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { EntreprisesOnCommunityServiceBase } from "./base/entreprisesOnCommunity.service.base";

@Injectable()
export class EntreprisesOnCommunityService extends EntreprisesOnCommunityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
