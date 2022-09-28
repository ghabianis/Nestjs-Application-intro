/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import { PrismaService } from "nestjs-prisma";
import { Prisma, Survey, Entreprise } from "@prisma/client";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { DbService } from "src/dbService/db.service";

export class SurveyServiceBase {
  constructor(protected readonly prisma: DbService) {}

  async count<T extends Prisma.SurveyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyFindManyArgs>
  ): Promise<number> {
    return this.prisma.survey.count(args);
  }

  async findMany<T extends Prisma.SurveyFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyFindManyArgs>
  ): Promise<PaginatedInterface<Survey>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.survey.findMany(args),
      this.prisma.survey.count(),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.SurveyFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyFindUniqueArgs>
  ): Promise<Survey | null> {
    return this.prisma.survey.findUnique(args);
  }
  async create<T extends Prisma.SurveyCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyCreateArgs>
  ): Promise<Survey> {
    return this.prisma.survey.create<T>(args);
  }
  async update<T extends Prisma.SurveyUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyUpdateArgs>
  ): Promise<Survey> {
    return this.prisma.survey.update<T>(args);
  }
  async delete<T extends Prisma.SurveyDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.SurveyDeleteArgs>
  ): Promise<Survey> {
    return this.prisma.survey.delete(args);
  }

  async getEntreprise(parentId: string): Promise<Entreprise | null> {
    return this.prisma.survey
      .findUnique({
        where: { id: parentId },
      })
      .entreprise();
  }
}