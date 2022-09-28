import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EventService } from "./event.service";
import { EventControllerBase } from "./base/event.controller.base";
import { Request } from "express";
import { SocialinterractionFindManyArgs } from "src/socialinterraction/base/SocialinterractionFindManyArgs";
import { plainToClass } from "class-transformer";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { getListSocialinterractionDto } from "src/socialinterraction/base/getListSocialinterraction.dto";

@swagger.ApiTags("events")
@common.Controller("events")
export class EventController extends EventControllerBase {
  constructor(
    protected readonly service: EventService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }



  // get upcoming subscribed events
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("events/upcoming")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async candidateCommunityView(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Event",
    });

    const resp = await this.service.candidateCommunityView({
      ...args,
      select: {
        userid: true,
        name: true,
        activityField: true,
        candidatid: true,
        communityid: true,
        photo: true,
        location: true,
        startdate: true,
        enddate: true,
        file: true,
        link: true,
        speakers: true,
        publicationid: true
      },
    });
    return {
      data: [{
        candidateCommunity: resp.candidateCommunity,
      }]
    };
  }



  // user subscribed to those events and he will receive notifications once those events are begun 
  // this API base role is to send notifications about the upcoming subscribed events for each user
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("SubscribedEvents/Notification")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async getVideosMediaInterraction(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Notification",
    });
    const response: any[] = []
    const resp = await this.service.subscribedEventsNotification({
      ...args,
      select: {
        userId: true,
        eventId: true,
        startDate: true,
        id: true,
        event: false,
        posterId: false,
        createdAt: false,
        publicationType: false,
        statue: false,
        offerId: false,
      },
    });
    for (var i = 0; i < resp.paginatedResult.length; i++) {
      if (resp.paginatedResult[i].startDate != null && resp.paginatedResult[i].eventId != null)
      response.push(resp.paginatedResult[i])
    }
    return { paginatedResult: response };
  }

}
