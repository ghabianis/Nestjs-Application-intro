import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { SocialinterractionService } from "./socialinterraction.service";
import { SocialinterractionControllerBase } from "./base/socialinterraction.controller.base";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { SocialinterractionFindManyArgs } from "./base/SocialinterractionFindManyArgs";
import { plainToClass } from "class-transformer";
import { Request } from "express";
import { getListSocialinterractionDto } from "./base/getListSocialinterraction.dto";
import { SocialinterractionWhereUniqueInput } from "./base/SocialinterractionWhereUniqueInput";
import * as errors from "../errors";
import { Socialinterraction } from "./base/Socialinterraction";
import * as nestMorgan from "nest-morgan";
import { EnumTypePub } from "@prisma/client";

@swagger.ApiTags("socialinterractions")
@common.Controller("socialinterractions")
export class SocialinterractionController extends SocialinterractionControllerBase {
  constructor(
    protected readonly service: SocialinterractionService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  // get stories interaction data

  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("Stories/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetStoriesMediaData(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });

    const resp = await this.service.getStoriesData({
      ...args,
      where: {
        ...args.where,
        deletedAt: {
          equals: null,
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      select: {
        // id: true,
        views: true,
        likes: true,
        comments: true,
        shares: true,
        title: true,
        description: true,
        userid: true,
        createdAt: true,
        deletedAt: true,
        entrepriseid: true,
        publicationId: true,
        mediaLink: true,
        dateInteraction: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get posts Media interaction
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("Posts/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetPostsMediaInterraction(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getPostsData({
      ...args,
      where: {
        ...args.where,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        title: true,
        description: true,
        entrepriseid: true,
        image: true,
        createdAt: true,
        postid: true,
        dateInteraction: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get videos Media interaction
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("Videos/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetVideosMediaInterraction(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.videosMedia({
      ...args,
      where: { ...args.where, deletedAt: { equals: null } },
      select: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        title: true,
        description: true,
        entrepriseid: true,
        label: true,
        url: true,
        videoId: true,
        createdAt: true,
        deletedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get event Media interaction
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("Event/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetEventsMediaData(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.eventMedia({
      ...args,
      where: {
        ...args.where,
        deletedAt: {
          equals: null,
        },
      },
      select: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        title: true,
        description: true,
        userid: true,
        location: true,
        file: true,
        startDate: true,
        id: true,
        endDate: true,
        link: true,
        speakers: true,
        attendees: true,
        createdAt: true,
        dateInteraction: true,
        entrepriseId: true,
        attended: true,
        publicationId: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get offers Media interaction
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("Offers/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async OffersView(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.offersView({
      ...args,
      where: { ...args.where, deletedAt: { equals: null } },
      select: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
        title: true,
        description: true,
        entrepriseId: true,
        userId: true,
        offerType: true,
        isactive: true,
        createdAt: true,
        offerId: true,
        attendees: true,
        publicationId: true,
        dateInteraction: true,
        isLike: true,
        place: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get RetcheeStates per Month
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("RetcheeStates/PerMonth/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetRetcheeDataStatesPerMonth(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getRectcheeStates({
      by: ['creation_weekofmonth', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_weekofmonth: 'asc',
        },
        {
          _sum: {
            views: 'asc',
          }
        },
        {
          _sum: {
            likes: 'asc',
          }
        },
        {
          _sum: {
            comments: 'asc',
          }
        },
        {
          _sum: {
            shares: 'asc',
          }
        },
      ],
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    let label = ["First Week", "Second Week", "Third Week", "Fourth Week", "Fifth Week"];
    const colors = ["#50CD89", "#3987FF", "#F586E6", "#7B61FF"];

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
      labels: labels,
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get RetcheeStates per Year
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("RetcheeStates/PerYear/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetRetcheeDataStatesPerYear(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getRectcheeStates({
      by: ['creation_month', 'creation_year', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_month: 'asc',
        },
        {
          _sum: {
            views: 'asc',
          }
        },
        {
          _sum: {
            likes: 'asc',
          }
        },
        {
          _sum: {
            comments: 'asc',
          }
        },
        {
          _sum: {
            shares: 'asc',
          }
        },
      ],
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    const colors = ["#50CD89", "#3987FF", "#F586E6", "#7B61FF"];
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

    let labels = [...new Set(allMonths)]
    labels.sort(function (a: string, b: string) {
      return label.indexOf(a) - label.indexOf(b);
    });

    return {
      labels: [...new Set(retLabels)],
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get RetcheeStates per Day
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("RetcheeStates/PerDay/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetRetcheeDataStatesPerDay(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getRectcheeStates({
      by: ['creation_hour', 'publicationId'],
      where: args.where,
      orderBy: [
        {
          creation_hour: 'asc',
        },
        {
          _sum: {
            views: 'asc',
          }
        },
        {
          _sum: {
            likes: 'asc',
          }
        },
        {
          _sum: {
            comments: 'asc',
          }
        },
        {
          _sum: {
            shares: 'asc',
          }
        },
      ],
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    let label = Array.from(Array(24).keys()).map(x => x.toString());

    const colors = ["#50CD89", "#3987FF", "#F586E6", "#7B61FF"];

    var hours = [];
    for (let element of resp.paginatedResult) {
      hours.push(element.creation_hour);
    }
    let labels = [...new Set(hours)]
    labels.sort(function (a: string, b: string) {
      return label.indexOf(a) - label.indexOf(b);
    });
    return {
      labels: labels,
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get RetcheeStates per Week
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("RetcheeStates/PerWeek/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetRetcheeDataStatesPerWeek(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getRectcheeStates({
      by: ['creation_dayofweek', 'publicationId'],
      orderBy: [
        {
          creation_dayofweek: 'asc',
        },
        {
          _sum: {
            views: 'asc',
          }
        },
        {
          _sum: {
            likes: 'asc',
          }
        },
        {
          _sum: {
            comments: 'asc',
          }
        },
        {
          _sum: {
            shares: 'asc',
          }
        },
      ],
      where: args.where,
      _sum: {
        views: true,
        likes: true,
        comments: true,
        shares: true,
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

    const colors = ["#50CD89", "#3987FF", "#F586E6", "#7B61FF"];

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
      labels: labels,
      datasets: [
        {
          data: result,
          color: colors,
        },
      ],
    };
  }

  // get User Likes Interaction With Entreprises from UserLikesView
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("GetUserLikesView/GetData")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async GetUserLikes(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Socialinterraction",
    });
    const resp = await this.service.getUserLikesView({
      ...args,
      select: {
        userid: true,
        likes: true,
        entrepriseid: true,
        entreprisename: true,
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: resp.totalCount };
  }

  // get User Likes Interaction With Entreprises from UserLikesView
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/Notifications")
  @swagger.ApiOkResponse({ type: getListSocialinterractionDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async SocialinterractionNotification(
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
    const rep2: any[] = [];
    const resp = await this.service.socialinterractionNotification({
      ...args,
      select: {
        userId: true,
        event: true,
        id: true,
        posterId: true,
        createdAt: true,
        publicationType: true,
        statue: false,
        offerId: false,
        eventId: false,
        startDate: false,
      },
    });
    for (var i = 0; i < resp.paginatedResult.length; i++) {
      if (resp.paginatedResult[i].posterId != null)
        rep2.push(resp.paginatedResult[i]);
    }
    return { paginatedResult: rep2 };
  }

  // get posts  / Offers for all
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("publication/:id")
  @nestAccessControl.UseRoles({
    resource: "Socialinterraction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Socialinterraction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async SocialinterractionOnPublications(
    @common.Param() params: SocialinterractionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ) {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Socialinterraction",
    });
    const resp = await this.service.socialinterractionData({
      where: {
        type: EnumTypePub["post"],
      },
      select: {
        id: false,
        createdAt: false,
        updatedAt: false,
        type: false,
        title: false,
        description: false,
        eventId: false,
        postId: false,
        offerId: false,
        storyId: false,
        videoId: false,
        offer: false,
        post: true,
        socialinterractions: {
          where: {
            type: "like",
            userId: params.id,
          },
          select: {
            type: true,
            publicationId: true,
          },
        },
      },
    });
    const resp2 = await this.service.socialinterractionData({
      where: {
        type: EnumTypePub["offer"],
      },
      select: {
        id: false,
        createdAt: false,
        updatedAt: false,
        type: false,
        title: false,
        description: false,
        eventId: false,
        postId: false,
        offerId: false,
        storyId: false,
        videoId: false,
        offer: true,
        post: false,
        socialinterractions: {
          where: {
            type: "like",
            userId: params.id,
          },
          select: {
            type: true,
            publicationId: true,
          },
        },
      },
    });
    const result1 = resp.paginatedResult.map((result1: any) =>
      permission.filter(result1)
    );

    const result2 = resp2.paginatedResult.map((result2: any) =>
      permission.filter(result2)
    );

    const posts: any[] = [];
    const offers: any[] = [];
    for (var i = 0; i < result1.length; i++) {
      if (result1[i].post != null) {
        posts.push(result1[i].post);
      }
    }
    for (var i = 0; i < result2.length; i++) {
      if (result2[i].offer != null) {
        offers.push(result2[i].offer);
      }
    }
    return {
      posts,
      offers,
      totalCount: [],
    };
  }

  // get videos / stories  And events for candidates
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("publication/Events/:id")
  @nestAccessControl.UseRoles({
    resource: "Socialinterraction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Socialinterraction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async socialinterractionStoriesVideosEventsLisForEachCandidate(
    @common.Param() params: SocialinterractionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: "candidate_role",
    @common.Req() request: Request
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Publication",
    });
    const resp = await this.service.socialinterractionEvents({
      ...args,
      where: {
        type: EnumTypePub["event"],
      },
      select: {
        title: true,
        description: true,
        event: true,
        socialinterractions: {
          where: {
            type: "like",
            userId: params.id,
          },
          select: {
            type: true,
            publicationId: true,
          },
        },
      },
    });
    const result = resp.paginatedResult.map((result: any) =>
      permission.filter(result)
    );
    const paginatedResult: any[] = [];
    let paginatedResults = {
      id: "",
      title: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      location: "",
      file: "",
      link: "",
      startDate: "",
      endDate: "",
      publicationId: "",
      isLiked: false,
    };
    let isliked: boolean = false;
    for (var i = 0; i < result.length; i++) {
      paginatedResults = {
        id: result[i].event["id"],
        title: result[i].title,
        description: result[i].description,
        createdAt: result[i].event["createdAt"],
        updatedAt: result[i].event["updatedAt"],
        deletedAt: result[i].event["deletedAt"],
        publicationId: result[i].event["publicationId"],
        location: result[i].event["location"],
        file: result[i].event["file"],
        link: result[i].event["link"],
        startDate: result[i].event["startDate"],
        endDate: result[i].event["endDate"],
        isLiked: false,
      };
      if (result[i].event != null) {
        for (var j = 0; j < result[i].socialinterractions.length; j++) {
          if (result[i].socialinterractions[j] != null) {
            isliked = true;
            paginatedResults.isLiked = isliked;
          }
        }
      }

      paginatedResult.push(paginatedResults);
    }
    return {
      paginatedResult,
      totalCount: resp.totalCount,
    };
  }

  // get videos / stories  And events for candidates
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("publication/Stories/:id")
  @nestAccessControl.UseRoles({
    resource: "Socialinterraction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Socialinterraction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async socialinterractionStories(
    @common.Param() params: SocialinterractionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: "candidate_role",
    @common.Req() request: Request
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Publication",
    });
    const resp = await this.service.socialinterractionStories({
      ...args,
      where: {
        type: EnumTypePub["story"],
      },
      select: {
        title: true,
        description: true,
        story: true,
        socialinterractions: {
          where: {
            type: "like",
            userId: params.id,
          },
          select: {
            type: true,
            publicationId: true,
          },
        },
      },
    });

    const result2 = resp.paginatedResult.map((result2: any) =>
      permission.filter(result2)
    );
    const paginatedResult: any[] = [];
    let paginatedResults = {
      id: "",
      title: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      deletedAt: "",
      publicationId: "",
      mediaLink: null,
      isLiked: false,
    };
    let isliked: boolean = false;
    for (var i = 0; i < result2.length; i++) {
      paginatedResults = {
        id: result2[i].story["id"],
        title: result2[i].title,
        description: result2[i].description,
        createdAt: result2[i].story["createdAt"],
        updatedAt: result2[i].story["updatedAt"],
        deletedAt: result2[i].story["deletedAt"],
        publicationId: result2[i].story["publicationId"],
        mediaLink: result2[i].story["mediaLink"],
        isLiked: false,
      };
      if (result2[i].story != null) {
        for (var j = 0; j < result2[i].socialinterractions.length; j++) {
          if (result2[i].socialinterractions[j] != null) {
            isliked = true;
            paginatedResults.isLiked = isliked;
          }
        }
      }

      paginatedResult.push(paginatedResults);
    }
    return {
      paginatedResult,
      totalCount: resp.totalCount,
    };
  }

  // get videos / stories  And events for candidates
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("publication/videos/:id")
  @nestAccessControl.UseRoles({
    resource: "Socialinterraction",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Socialinterraction })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  @swagger.ApiQuery({
    type: () => SocialinterractionFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async socialinterractionVideos(
    @common.Param() params: SocialinterractionWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: "candidate_role",
    @common.Req() request: Request
  ) {
    const args = plainToClass(SocialinterractionFindManyArgs, request.query);
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Publication",
    });

    const resp = await this.service.socialinterractionVideos({
      ...args,
      where: {
        type: EnumTypePub["video"],
      },
      select: {
        title: true,
        description: true,
        video: true,
        socialinterractions: {
          where: {
            type: "like",
            userId: params.id,
          },
          select: {
            type: true,
            publicationId: true,
          },
        },
      },
    });

    const result3 = resp.paginatedResult.map((result3: any) =>
      permission.filter(result3)
    );
    const paginatedResult: any[] = [];
    let paginatedResults = {
      id: "",
      title: "",
      description: "",
      createdAt: "",
      updatedAt: "",
      categoryId: "",
      entrepriseId: "",
      publicationId: "",
      url: null,
      isLiked: false,
    };
    let isliked: boolean = false;
    for (var i = 0; i < result3.length; i++) {
      paginatedResults = {
        id: result3[i].video["id"],
        title: result3[i].title,
        description: result3[i].description,
        createdAt: result3[i].video["createdAt"],
        updatedAt: result3[i].video["updatedAt"],
        categoryId: result3[i].video["categoryId"],
        entrepriseId: result3[i].video["entrepriseId"],
        publicationId: result3[i].video["publicationId"],
        url: result3[i].video["url"],
        isLiked: false,
      };
      if (result3[i].video != null) {
        for (var j = 0; j < result3[i].socialinterractions.length; j++) {
          if (result3[i].socialinterractions[j] != null) {
            isliked = true;
            paginatedResults.isLiked = isliked;
          }
        }
      }

      paginatedResult.push(paginatedResults);
    }

    return {
      paginatedResult,
      totalCount: resp.totalCount,
    };
  }
}
