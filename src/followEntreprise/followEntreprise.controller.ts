import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FollowEntrepriseService } from "./followEntreprise.service";
import { FollowEntrepriseControllerBase } from "./base/followEntreprise.controller.base";
import { plainToClass } from "class-transformer";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { getListFeedbackDto } from "src/feedback/base/getListFeedback.dto";
import { FeedbackFindManyArgs } from "src/feedback/base/FeedbackFindManyArgs";
import { Request } from "express";

@swagger.ApiTags("follow-entreprises")
@common.Controller("follow-entreprises")
export class FollowEntrepriseController extends FollowEntrepriseControllerBase {
  constructor(
    protected readonly service: FollowEntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }



  //function get top users with the subscribers number and all likes and shares for entreprise posts
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("board/statistics/enterprise")
  @swagger.ApiOkResponse({ type: getListFeedbackDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => FeedbackFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetStoriesMediaData(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(FeedbackFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "statesBoardTableView",
    });

    const resp = await this.service.statesBoardTableView({
      ...args,
      select: {
        userid: true,
        likes: true,
        subscribers: true,
        shares: true,
        entrepriseid: true,
        entreprisename: true
      },
    });
    const result1 = resp.stats.map((result1: any) =>
      permission.filter(result1)
    );
    const resp2 = await this.service.user_list({
      ...args,
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        username: true,
        roles: true,
        email: true,
        phone: true,
        address: true,
        like: true,
        share: true,
        comment: true,
        view: true,
        //job: true
      },
    });
    const result = resp2.topusers.map((result: any) =>
      permission.filter(result)
    );
    console.log("this is our result1", resp.stats)
    console.log("this is our result", resp2.topusers)

    return {
      stats : resp.stats,
      topusers : resp2.topusers
    };
  }
}
