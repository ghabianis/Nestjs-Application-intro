import { Injectable } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CandidateServiceBase } from "./base/candidate.service.base";
import { PrismaService } from "nestjs-prisma";
import axios from "axios";
import { argsToArgsConfig } from "graphql/type/definition";

@Injectable()
export class CandidateService extends CandidateServiceBase {
  constructor(protected readonly prisma: DbService,
    protected readonly prismaService: PrismaService,
    ) {
    super(prisma,prismaService);
  }
  async GetCandidatLanguage(args:any){
    return this.prisma.candidatelanguage.findMany(args);
  }

     
}
