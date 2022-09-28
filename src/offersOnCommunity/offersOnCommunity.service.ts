import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { OffersOnCommunityServiceBase } from "./base/offersOnCommunity.service.base";

@Injectable()
export class OffersOnCommunityService extends OffersOnCommunityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
