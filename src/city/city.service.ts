import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CityServiceBase } from "./base/city.service.base";

@Injectable()
export class CityService extends CityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
