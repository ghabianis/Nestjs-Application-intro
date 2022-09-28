import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { PublicationsOnCommunityServiceBase } from "./base/publicationsOnCommunity.service.base";

@Injectable()
export class PublicationsOnCommunityService extends PublicationsOnCommunityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
