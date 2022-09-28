import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UserServiceBase } from "./base/user.service.base";
import { PasswordService } from "../auth/password.service";
import { audienceList,userList  } from "@prisma/client";

import { PaginatedInterface } from "src/util/PaginatedInterface";
import { DbService } from "src/dbService/db.service";
import { User } from "./base/User";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly db_prisma: DbService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }

  async getAudienceList(args:any): Promise<PaginatedInterface<audienceList>>{
    const [data, totalCount]= await Promise.all ([
     await this.db_prisma.audienceList.findMany(args),
     this.db_prisma.audienceList.count()
    ]);
    return { paginatedResult: data, totalCount };
    
    }
  async getUserList(args:any): Promise<PaginatedInterface<userList>>{
    const [data, totalCount]= await Promise.all ([
     await this.db_prisma.userList.findMany(args),
     this.db_prisma.userList.count()
    ]);
    return { paginatedResult: data, totalCount };

  }

  //update user profile info  service
  async updateUserProfile(
    args: any,
    params: any
  ) {
    const resp = await this.prisma.user.update({
      where: {
        id: params
      },
      data: {
        id: params,
        firstName: args.firstName,
        lastName: args.lastName,
        username: args.username,
        roles: args.roles,
        email: args.email,
        phone: args.phone,
        address: args.address,
        sex: args.sex,
        city: args.city,
        kmRadius: args.kmRadius,
        candidate: {
          update: {
            updatedAt: new Date(),
            activityField: args.candidate.activityField,
            wantedPost: args.candidate.wantedPost,
            experiencesYears: args.candidate.experiencesYears,
            languages: args.candidate.languages,
            tags: args.candidate.tags,
            maxSalary: args.candidate.maxSalary,
            minSalary: args.candidate.minSalary,
            personalCv: args.candidate.personalCv,
            mediaLink: args.candidate.mediaLink,
            courses: {
              create: {
                title: args.candidate.courses[0].title,
                centerName: args.candidate.courses[0].centerName,
                startDate: args.candidate.courses[0].startDate,
                endDate: args.candidate.courses[0].endDate,
                isForming: args.candidate.courses[0].isForming,
                country: args.candidate.courses[0].country,
                description: args.candidate.courses[0].description,
              }
            },
            experiences: {
              create: {
                occupiedPosition: args.candidate.courses[0].occupiedPosition,
                companyName: args.candidate.courses[0].companyName,
                startDate: args.candidate.courses[0].startDate,
                endDate: args.candidate.courses[0].endDate,
                isWorking: args.candidate.courses[0].isWorking,
                country: args.candidate.courses[0].country,
                description: args.candidate.courses[0].description,
              }
            },
            job: {
              update: {
                name: args.job.name
              }
            }
          },
        },

      }
    })
    console.log(JSON.stringify(resp, null, 2))
  }
}
