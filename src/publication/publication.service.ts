import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { PublicationServiceBase } from "./base/publication.service.base";

@Injectable()
export class PublicationService extends PublicationServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
