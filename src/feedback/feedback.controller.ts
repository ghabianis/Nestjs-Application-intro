import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { FeedbackControllerBase } from "./base/feedback.controller.base";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { plainToClass } from "class-transformer";
import { Request } from "express";
import { FeedbackService } from "./feedback.service";
import { FeedbackFindManyArgs } from "./base/FeedbackFindManyArgs";
import { getListFeedbackDto } from "./base/getListFeedback.dto";
@swagger.ApiTags("feedbacks")
@common.Controller("feedbacks")
export class FeedbackController extends FeedbackControllerBase {
  constructor(
    protected readonly service: FeedbackService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }



  //function get list of candidates inroled in specifique offer with status 
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("applyed/candidates")
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
      resource: "Socialinterraction",
    });

    const resp = await this.service.ApplyedCandiateList({
      ...args,
      select: {
        userid: true,
        feedbackstatus: true,
        offerstatus: true,
        content: true,
        offertype: true,
        offerid: true,
        feedback: true,
        firstName: true,
        lastName: true,
        photo: true,
        email: true,
        likes: true,
        comments: true,
        shares: true,
        job: true,
        mediaLink: true,
        personalCv: true,
        isFavourite: true,
      },
    });
    var i;
    var waiting: any[] = [];
    var Approved: any[] = [];
    var Rejected: any[] = [];
    var Inprocess: any[] = [];

    for (i = 0; i < resp.paginatedResult.length; i++) {
      console.log('sd', resp.paginatedResult[i].feedbackstatus)
      if (resp.paginatedResult[i].feedbackstatus == 'waiting') {
        console.log('this is the waiting', resp.paginatedResult[i])
        waiting.push(resp.paginatedResult[i])

      } else if (resp.paginatedResult[i].feedbackstatus == 'approved') {
        Approved.push(resp.paginatedResult[i])

      } else if (resp.paginatedResult[i].feedbackstatus == 'inporgress') {
        Inprocess.push(resp.paginatedResult[i])


      } else if (resp.paginatedResult[i].feedbackstatus == 'rejected') {
        Rejected.push(resp.paginatedResult[i])
      }
    }

    return {
      WaitingCandidates: waiting,
      ApprovedCandidates: Approved,
      RejectedCandidates: Rejected,
      InprogressCandidates: Inprocess,
      totalCount: resp.totalCount
    };
  }

  // get OfferFeedbackStats per Month
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("OfferFeedbackStats/PerMonth/GetData")
  @swagger.ApiOkResponse({ type: getListFeedbackDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => FeedbackFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetOfferFeedbackStatsPerMonth(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(FeedbackFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Feedback",
    });
    const resp = await this.service.getOfferFeedbackStats({
      by: ['creation_weekofmonth', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_weekofmonth: 'asc',
        },
        {
          _sum: {
            applicants: 'asc',
          }
        }
      ],
      _sum: {
        applicants: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    let label = ["First Week", "Second Week", "Third Week", "Fourth Week", "Fifth Week"];
    const colors = ["#D74E4E"];

    var weekOfMonth = [];
    var allweeks: string[] = [];
    for (let i = 0; i < resp.paginatedResult.length; ++i) {
      weekOfMonth.push(resp.paginatedResult[i].creation_weekofmonth);
    }
    for (const { index, value } of weekOfMonth.map((value, index) => ({ index, value }))) {
      allweeks.push(label[+value - 1])
      result[index].creation_weekofmonth = label[+value - 1]
    }
    let labels = [...new Set(allweeks)]
    labels.sort(function (a: string, b: string) {
      return label.indexOf(a) - label.indexOf(b);
    });
    return {
      labels: [
        {
          labels: labels,
          allLabels: label,
        }
      ],
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get OfferFeedbackStats per Year
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("OfferFeedbackStats/PerYear/GetData")
  @swagger.ApiOkResponse({ type: getListFeedbackDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => FeedbackFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetOfferFeedbackStatsPerYear(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(FeedbackFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Feedback",
    });
    const resp = await this.service.getOfferFeedbackStats({
      by: ['creation_month', 'creation_year', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_month: 'asc',
        },
        {
          _sum: {
            applicants: 'asc',
          }
        }
      ],
      _sum: {
        applicants: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    let label = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const colors = ["#D74E4E"];
    let year = [];

    let monthOfYear = [];
    let allMonths = [];
    for (let element of resp.paginatedResult) {
      year.push(element.creation_year);
      monthOfYear.push(element.creation_month);
    }
    const retLabels = []
    for (const { index, value } of monthOfYear.map((value, index) => ({ index, value }))) {
      allMonths.push(label[+value - 1])
      result[index].creation_month = label[+value - 1]
      retLabels[index] = label[+value - 1]
    }
    return {
      labels: [
        {
          labels: [...new Set(retLabels)],
          allLabels: label,
        }
      ],
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get OfferFeedbackStats per Day
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("OfferFeedbackStats/PerDay/GetData")
  @swagger.ApiOkResponse({ type: getListFeedbackDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => FeedbackFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetOfferFeedbackStatsPerDay(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(FeedbackFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Feedback",
    });
    const resp = await this.service.getOfferFeedbackStats({
      by: ['creation_hour', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_hour: 'asc'
        },
        {
          _sum: {
            applicants: 'asc',
          }
        }
      ],
      _sum: {
        applicants: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    let label = Array.from(Array(24).keys()).map(num => num % 10 == num ? "0" + num : num.toString());

    const colors = ["#D74E4E"];

    var hours = [];
    for (let element of resp.paginatedResult) {
      hours.push(element.creation_hour);
    }
    let labels = [...new Set(hours)]
    labels.sort(function (a: string, b: string) {
      return label.indexOf(a) - label.indexOf(b);
    });
    return {
      labels: [
        {
          labels: labels,
          allLabels: label,
        }
      ],
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get OfferFeedbackStats per Week
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("OfferFeedbackStats/PerWeek/GetData")
  @swagger.ApiOkResponse({ type: getListFeedbackDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => FeedbackFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetOfferFeedbackStatsPerWeek(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(FeedbackFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Feedback",
    });
    const resp = await this.service.getOfferFeedbackStats({
      by: ['creation_dayofweek', 'publicationId'],
      orderBy: [
        {
          creation_dayofweek: 'asc',
        },
        {
          _sum: {
            applicants: 'asc',
          }
        }
      ],
      where: args.where,
      _sum: {
        applicants: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    let label = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const colors = ["#D74E4E"];

    var dayOfWeek = [];
    var allDays: string[] = [];
    for (let element of resp.paginatedResult) {
      dayOfWeek.push(element.creation_dayofweek);
    }
    for (const { index, value } of dayOfWeek.map((value, index) => ({ index, value }))) {
      allDays.push(label[+value - 1])
      result[index].creation_dayofweek = label[+value - 1]
    }
    let labels = [...new Set(allDays)]
    labels.sort(function (a: string, b: string) {
      return label.indexOf(a) - label.indexOf(b);
    });
    return {
      labels: [
        {
          labels: labels,
          allLabels: label,
        }
      ],
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }
}
