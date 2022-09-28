import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CategoryServiceBase } from "./base/category.service.base";

@Injectable()
export class CategoryService extends CategoryServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
