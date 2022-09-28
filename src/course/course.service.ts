import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CourseServiceBase } from "./base/course.service.base";

@Injectable()
export class CourseService extends CourseServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
