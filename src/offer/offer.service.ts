import { Injectable } from "@nestjs/common";
import { Notification } from "@prisma/client";
import { PrismaService } from "nestjs-prisma";
import { NotificationsInterface } from "src/util/NotificationsInterface";
import { PaginatedInterface } from "src/util/PaginatedInterface";
import { DbService } from "./../dbService/db.service";
import { OfferServiceBase } from "./base/offer.service.base";

@Injectable()
export class OfferService extends OfferServiceBase {
  constructor(protected readonly prisma: DbService, protected readonly prismaService: PrismaService,) {
    super(prisma);
  }


   //function to get all applyed offers status changes as notifications

   async applyedOffersNotification(args: any): Promise<NotificationsInterface<Notification>> {
    const [data] = await Promise.all([
      await this.prisma.notification.findMany(args),
      this.prisma.notification.count()
    ]);
    return { paginatedResult: data };

  }
  }

  
