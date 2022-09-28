import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { StoryServiceBase } from "./base/story.service.base";

@Injectable()
export class StoryService extends StoryServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
