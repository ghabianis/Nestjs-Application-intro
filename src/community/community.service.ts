import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { CommunityServiceBase } from "./base/community.service.base";
import { Prisma, CommunityPosts} from "@prisma/client";
import { PaginatedInterface } from "src/util/PaginatedInterface";

@Injectable()
export class CommunityService extends CommunityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }

// get posts of community from Community posts View
async geCommunityPosts(args:any): Promise <PaginatedInterface<CommunityPosts>>{
  console.log(args,"args");
  
const [data, totalCount] = await Promise.all([
  await this.prisma.communityPosts.findMany(args),
  this.prisma.communityPosts.count()
]);
return { paginatedResult: data, totalCount };
}
}
