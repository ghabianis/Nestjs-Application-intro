import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { EventServiceBase } from "./base/event.service.base";
import { Prisma, Socialinterraction, Publication, User, Storiesview, PostsView, Eventsview, Videoview, Offersview, Retcheeview, UserLikesView, CandidateCommunityView, Notification } from "@prisma/client";
import { PaginatedInterface } from "src/util/PaginatedInterface";
import { EventInterface } from "src/util/EventInterface";
import { NotificationsInterface } from "src/util/NotificationsInterface";

@Injectable()
export class EventService extends EventServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }

  //function get stories data
  async candidateCommunityView(args: any): Promise<EventInterface<CandidateCommunityView>> {
    const [data] = await Promise.all([
      this.prisma.candidateCommunityView.findMany(args),
      this.prisma.candidateCommunityView.count()
    ]);
    return {
      candidateCommunity:data
    };
  }
// function get Notification for  subscribed events 
  async subscribedEventsNotification(args: any): Promise<NotificationsInterface<Notification>> {
    const [data] = await Promise.all([
      await this.prisma.notification.findMany(args),
      this.prisma.notification.count()
    ]);
    return { paginatedResult: data };

  }
}
