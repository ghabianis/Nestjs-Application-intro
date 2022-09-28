import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { NotificationsInterface } from "src/util/NotificationsInterface";
import { UsersOnCommunityServiceBase } from "./base/usersOnCommunity.service.base";
import { Prisma, Socialinterraction, Publication, User, Community, Storiesview, PostsView, Eventsview, Videoview, Offersview, Retcheeview, UserLikesView, Notification, EnumTypePub } from "@prisma/client";
import { PublicationsOnCommunity } from "src/publicationsOnCommunity/base/PublicationsOnCommunity";
import { PaginatedInterface } from "src/util/PaginatedInterface";
import { truncate } from "fs";


@Injectable()
export class UsersOnCommunityService extends UsersOnCommunityServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }

  // function get Notification for  subscribed events 
  async allPostsOnCommunityWithLikedPosts(args: any): Promise<PaginatedInterface<Publication>> {

    const [data, totalCount] = await Promise.all([
      await this.prisma.publication.findMany({
        where: {
          userId: args,
          type: EnumTypePub['post'],
        },
        select: {
          id: true,
          type: true,
          title: true,
          description: true,
          eventId: true,
          postId: true,
          offerId: true,
          storyId: true,
          videoId: true,
          userId: true,
          deletedAt: true,
          publicationsOnCommunities: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              deletedAt: true,
              publicationId: true,
              communityId: true
            }
          },
          socialinterractions: {
            where: {
              type: 'like',
              userId: args
            },
            select: {
              id: true,
              type: true,
              userId: true
            }
          },
        },
      }),
      this.prisma.publicationsOnCommunity.count()
    ]);
    let response = {
      id: "",
      userId: "",
      type: "",
      title: "",
      description: "",
      communityId: "",
      publicationId: "",
      isLiked: false
    }
    const paginatedResult: any[] = []
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < data[i].publicationsOnCommunities.length; j++) {
         response = {
          id: data[i].id!,
          userId: data[i].userId!,
          type: data[i].type!,
          title: data[i].title!,
          description: data[i].description!,
          communityId: data[i].publicationsOnCommunities[j].communityId!,
          publicationId: data[i].publicationsOnCommunities[j].publicationId!,
          isLiked: false
        }
        for (var k = 0; k < data[i].socialinterractions.length; k++) {
          if (data[i].socialinterractions[k].userId != null) {
            response.isLiked = true
          }
        }
        paginatedResult.push(response)
      }
    }
    return { paginatedResult, totalCount: totalCount };
  }

}
