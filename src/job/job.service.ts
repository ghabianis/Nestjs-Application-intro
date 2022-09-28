import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { JobServiceBase } from "./base/job.service.base";

@Injectable()
export class JobService extends JobServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
