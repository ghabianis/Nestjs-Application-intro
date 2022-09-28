import { Injectable } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { PaginatedInterface } from "src/util/PaginatedInterface";
import { SocialinterractionServiceBase } from "./base/socialinterraction.service.base";
import {
  Publication,
  Storiesview,
  PostsView,
  Eventsview,
  Videoview,
  Offersview,
  Retcheeview,
  UserLikesView,
  Notification,
} from "@prisma/client";
import { SocialInteractionStatsInterface } from "src/util/RetcheeStatsInterface";
import { PostOffersInterface } from "src/util/PostOffersInterface";
import { NotificationsInterface } from "src/util/NotificationsInterface";

@Injectable()
export class SocialinterractionService extends SocialinterractionServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }

  //function get stories data
  async getStoriesData(args: any): Promise<PaginatedInterface<Storiesview>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.storiesview.findMany(args),
      this.prisma.storiesview.count({ where: args["where"] }),
    ]);
    return { paginatedResult: data, totalCount };
  }

  //function to get posts likes/views/comments/shares...

  async getPostsData(args: any): Promise<PaginatedInterface<PostsView>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.postsView.findMany(args),
      this.prisma.postsView.count({ where: args.where }),
    ]);
    return { paginatedResult: data, totalCount };
  }

  // Service to get videos  likes/views/comments/shares...
  async videosMedia(args: any): Promise<PaginatedInterface<Videoview>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.videoview.findMany(args),
      this.prisma.videoview.count({ where: args.where }),
    ]);
    return { paginatedResult: data, totalCount };
  }

  // Service get videos  likes/views/comments/shares...
  async eventMedia(args: any): Promise<PaginatedInterface<Eventsview>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.eventsview.findMany(args),
      this.prisma.eventsview.count({ where: args.where }),
    ]);
    return { paginatedResult: data, totalCount };
  }

  // service to get  OffersView likes/views/comments/shares...

  async offersView(args: any): Promise<PaginatedInterface<Offersview>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.offersview.findMany(args),
      this.prisma.offersview.count({ where: args.where }),
    ]);
    return { paginatedResult: data, totalCount };
  }

  //service to get  GetRectcheeStates Statistics per month/year/day/week
  async getRectcheeStates(
    args: any
  ): Promise<SocialInteractionStatsInterface<any>> {
    const [data] = await Promise.all([
      await this.prisma.retcheeview.groupBy(args),
    ]);
    return {
      labels: [],
      paginatedResult: data,
      datasets: [
        {
          data: [],
          color: [],
        },
      ],
    };
  }
  // get User Likes Interaction With Entreprises from UserLikesView Service

  async getUserLikesView(
    args: any
  ): Promise<PaginatedInterface<UserLikesView>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.userLikesView.findMany(args),
      this.prisma.userLikesView.count(),
    ]);
    return { paginatedResult: data, totalCount };
  }

  // get User Likes Interaction With Entreprises from UserLikesView Service
  async socialinterractionNotification(
    args: any
  ): Promise<NotificationsInterface<Notification>> {
    const [data] = await Promise.all([
      await this.prisma.notification.findMany(args),
      this.prisma.notification.count(),
    ]);
    return { paginatedResult: data };
  }

  //SocialinterractionOnPublications
  async socialinterractionData(
    args: any
  ): Promise<PostOffersInterface<Publication>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.publication.findMany(args),
      this.prisma.publication.count(),
    ]);
    return { offers: [], posts: [], paginatedResult: data, totalCount };
  }

  //SocialinterractionOnPublications
  async socialinterractionStories(
    args: any
  ): Promise<PaginatedInterface<Publication>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.publication.findMany(args),
      this.prisma.publication.count(),
    ]);
    return {
      paginatedResult: data,
      totalCount,
    };
  }

  //SocialinterractionOnPublications
  async socialinterractionVideos(
    args: any
  ): Promise<PaginatedInterface<Publication>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.publication.findMany(args),
      this.prisma.publication.count(),
    ]);
    return {
      paginatedResult: data,
      totalCount,
    };
  }

  //SocialinterractionOnPublications
  async socialinterractionEvents(
    args: any
  ): Promise<PaginatedInterface<Publication>> {
    const [data, totalCount] = await Promise.all([
      await this.prisma.publication.findMany(args),
      this.prisma.publication.count(),
    ]);
    return {
      paginatedResult: data,
      totalCount,
    };
  }
}
