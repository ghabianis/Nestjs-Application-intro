import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";


@Injectable()
export class CandidateslanguageService {
  constructor(protected readonly prisma: DbService) {
    
  }
}
