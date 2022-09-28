import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import * as nestMorgan from "nest-morgan";
import { UserService } from "./user.service";
import { UserControllerBase } from "./base/user.controller.base";
import { userList, audienceList } from "@prisma/client";
import { userListDTO } from "./base/UserList";
import { PaginatedInterface } from "../util/PaginatedInterface";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { UserListFindManyArgs } from "./base/UserListFindManyArgs";
import { User } from "./base/User";
import * as errors from "../errors";
import { UserWhereUniqueInput } from "./base/UserWhereUniqueInput";
import { UserCreateInput } from "./base/UserCreateInput";
import { CreatePostArgs } from "src/post/base/CreatePostArgs";
import { PostCreateInput } from "src/post/base/PostCreateInput";
import { Publication } from "src/publication/base/Publication";
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
@swagger.ApiTags("users")
@common.Controller("users")
export class UserController extends UserControllerBase {
  constructor(
    protected readonly service: UserService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/audienceList")
  @nestAccessControl.UseRoles({
    resource: "audienceList",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: userListDTO })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => UserListFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async getAudienceList(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<audienceList>> {
    const args = plainToClass(UserListFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "audienceList",
    });

    console.log("args ", args)
    const results = await this.service.getAudienceList({
      ...args,
      orderBy: [{ total_interactions: 'desc' }],
      select: {
        userId: true,
        firstName: true,
        username: true,
        roles: true,
        email: true,
        phone: true,
        address: true,
        view: true,
        like: true,
        comment: true,
        share: true,
        total_interactions: true,
        wantedPost: true,
        personalCv: true,
        mediaLink: true,
        photo: true,
        tags: true,
      },
    });
    const result = results.paginatedResult.map((result: audienceList) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/userList")
  @nestAccessControl.UseRoles({
    resource: "userList",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: userListDTO })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => UserListFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async getUserList(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<userList>> {
    const args = plainToClass(UserListFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "userList",
    });

    console.log("args ", args)
    const results = await this.service.getUserList({
      ...args,
      orderBy: [{ total_interactions: 'desc' }],
      select: {
        userId: true,
        firstName: true,
        username: true,
        roles: true,
        email: true,
        phone: true,
        address: true,
        view: true,
        like: true,
        comment: true,
        share: true,
        total_interactions: true,
        wantedPost: true,
        personalCv: true,
        mediaLink: true,
        photo: true,
        tags: true,
      },
    });
    const result = results.paginatedResult.map((result: userList) =>
      permission.filter(result)
    );

    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id")
  @nestAccessControl.UseRoles({
    resource: "User",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: User })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: UserWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "User",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        photo: true,
        firstName: true,
        lastName: true,
        address: true,
        candidate: {
          select: {
            activityField: true,
            wantedPost: true,
            experiencesYears: true,
            languages: true,
            tags: true,
            personalCv: true,
            mediaLink: true
          }
        }
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }



  //create Admin user posts
  // @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  // @common.UseGuards(
  //   defaultAuthGuard.DefaultAuthGuard,
  //   nestAccessControl.ACGuard
  // )
  // @common.Post("createUserPost")
  // @nestAccessControl.UseRoles({
  //   resource: "User",
  //   action: "read",
  //   possession: "own",
  // })
  // @swagger.ApiOkResponse({ type: User })
  // @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  // @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  // async createUserAdminPosts(
  //   @common.Body() data: PostCreateInput,
  //   @nestAccessControl.UserRoles() userRoles: string[]
  // ): Promise<User | null> {
  //   const permission = this.rolesBuilder.permission({
  //     role: userRoles,
  //     action: "read",
  //     possession: "own",
  //     resource: "User",
  //   });
  //   const result = await this.service.createUserAdminPosts({
  //     data: {
  //       ...data,
  //       publication: {
  //         create:  {
  //           ...data.publication ,
  //           type:'post',
  //           publicationsOnCommunities: data.publication.publicationsOnCommunities && data.publication.publicationsOnCommunities.length > 0 ? {
  //             createMany :{data: data.publication.publicationsOnCommunities.map((e) => {
  //               return {communityId:e}
  //             })}
  //           }: undefined,
  //           user: data.publication.user ? {
  //             connect: data.publication.user
  //           }: undefined,
  //           offer: undefined,
  //           story:undefined,
  //           video:undefined,
  //           event:undefined,
  //         }
  //       },
  //       entreprise: data.entreprise
  //         ? {
  //             connect: data.entreprise,
  //           }
  //         : undefined,
  //     },
  //     select: {
  //       id: true,
  //       createdAt: true,
  //       updatedAt: true,
  //       image: true,

  //       publication: {
  //         select: {
  //           id: true,
  //         },
  //       },

  //       entreprise: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },
  //   });
  //   return permission.filter(result);
  // }



}
