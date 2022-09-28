import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { UsersOnEntrepriseServiceBase } from "./base/usersOnEntreprise.service.base";

@Injectable()
export class UsersOnEntrepriseService extends UsersOnEntrepriseServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }
}
