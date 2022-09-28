import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { OfferService } from "./offer.service";
import { OfferControllerBase } from "./base/offer.controller.base";
import { OfferCreateInput } from "./base/OfferCreateInput";
import { Controller, Post, Body, Get } from "@nestjs/common";
import { SocialinterractionFindManyArgs } from "src/socialinterraction/base/SocialinterractionFindManyArgs";
import { plainToClass } from "class-transformer";
import { getListSocialinterractionDto } from "src/socialinterraction/base/getListSocialinterraction.dto";
import { Request } from "express";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";


@swagger.ApiTags("offers")
@common.Controller("offers")
export class OfferController extends OfferControllerBase {
  constructor(
    protected readonly service: OfferService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  // Enrolled Offers notification API
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("EnrolledOffers/Notification")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async ApplyedOffersNotification(
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
    const resp3 : any [] = []
    const resp = await this.service.applyedOffersNotification({
      ...args,
      select: {
        id: true,
        statue: true,
        userId: true,
        offerId: true,
        createdAt: true,
        eventId: false,
        startDate: false,
        event: false,
        posterId: false,
        publicationType: false,
      },
    });

    for (var i = 0;i<resp.paginatedResult.length;i++){
      if (resp.paginatedResult[i].statue != null)
       resp3.push(resp.paginatedResult[i])
     }
    return { paginatedResult: resp3 };
  }



}
