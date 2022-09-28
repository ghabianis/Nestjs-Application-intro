import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { Candidate } from "src/candidate/base/Candidate";
import { DbService } from "src/dbService/db.service";
import { EntrepriseServiceBase } from "./base/entreprise.service.base";
import { map } from 'rxjs/operators';
import { Socialinterraction } from "src/socialinterraction/base/Socialinterraction";
import { PaginatedInterface } from "src/util/PaginatedInterface";
import { any } from "jest-mock-extended";

@Injectable()
export class EntrepriseService extends EntrepriseServiceBase {
  constructor(protected readonly prisma: DbService, private readonly prismaService: PrismaService,) {
    super(prisma);
  }
  async enterpriseList(args: any) {

    const paginatedResult: any[] = []
    let response = {
      id: '',
      userId: '',
      name: '',
      owner: '',
      presentationContent: '',
      presentationVideolink: '',
      websiteLink: '',
      linkedinLink: '',
      instagramLink: '',
      departement: '',
      workersNumber: 0
    }
    //**i was trying to test if i can use just prisma query in this API and i find that it's 
    //** not possible because the _count function accept just the type boolean **/
    const resp = await this.prisma.publication.findMany({
      where: {
        AND: [
          {
            userId: args,
          },
          {
            socialinterractions: {
              every: {
                type: 'like',
              }
            }
          },

        ],
      },
      select: {
        userId: true,
        _count: {
          select: {
            socialinterractions: true
          },
        },
        user: {
          select: {
            candidate: {
              select: {
                userId: true
              }
            },
            usersOnEntreprises: {
              where: {
                userId: args
              },
              select: {
                entreprise: {
                  select: {
                    id: true,
                    name: true,
                    owner: true,
                    presentationContent: true,
                    presentationVideolink: true,
                    websiteLink: true,
                    linkedinLink: true,
                    instagramLink: true,
                    departement: true,
                    workersNumber: true,
                  }
                }
              },
            }
          },
        },
      },
      orderBy: {
        socialinterractions: {
          _count: 'asc'
        }
      }
    })

    for (var i = 0; i < resp.length; i++) {
      if (resp[i]._count.socialinterractions >= 10) {
        response = {
          id: resp[i].user?.usersOnEntreprises[i].entreprise?.id!,
          userId: resp[i].user?.candidate?.userId!,
          name: resp[i].user?.usersOnEntreprises[i].entreprise?.name!,
          owner: resp[i].user?.usersOnEntreprises[i].entreprise?.owner!,
          presentationContent: resp[i].user?.usersOnEntreprises[i].entreprise?.presentationContent!,
          presentationVideolink: resp[i].user?.usersOnEntreprises[i].entreprise?.presentationVideolink!,
          websiteLink: resp[i].user?.usersOnEntreprises[i].entreprise?.websiteLink!,
          linkedinLink: resp[i].user?.usersOnEntreprises[i].entreprise?.linkedinLink!,
          instagramLink: resp[i].user?.usersOnEntreprises[i].entreprise?.instagramLink!,
          departement: resp[i].user?.usersOnEntreprises[i].entreprise?.departement!,
          workersNumber: resp[i].user?.usersOnEntreprises[i].entreprise?.workersNumber!,

        }
        paginatedResult.push(response)
      }
    }

    return { paginatedResult }
  }




}









