/*
//------------------------------------------------------------------------------ 
// This code was generated by Amplication. 
// 
// Changes to this file will be lost if the code is regenerated. 
//
// There are other ways to to customize your code, see this doc to learn more
// https://docs.amplication.com/docs/how-to/custom-code
//
//------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestMorgan from "nest-morgan";
import * as nestAccessControl from "nest-access-control";
import * as defaultAuthGuard from "../../auth/defaultAuth.guard";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { CommunityService } from "../community.service";
import { CommunityCreateInput } from "./CommunityCreateInput";
import { CommunityWhereInput } from "./CommunityWhereInput";
import { CommunityWhereUniqueInput } from "./CommunityWhereUniqueInput";
import { CommunityFindManyArgs } from "./CommunityFindManyArgs";
import { CommunityUpdateInput } from "./CommunityUpdateInput";
import { Community } from "./Community";
import { Post } from "../../post/base/Post";
import { OffersOnCommunityWhereInput } from "../../offersOnCommunity/base/OffersOnCommunityWhereInput";
import { OffersOnCommunity } from "../../offersOnCommunity/base/OffersOnCommunity";
import { PublicationsOnCommunityWhereInput } from "../../publicationsOnCommunity/base/PublicationsOnCommunityWhereInput";
import { PublicationsOnCommunity } from "../../publicationsOnCommunity/base/PublicationsOnCommunity";
import { UsersOnCommunityWhereInput } from "../../usersOnCommunity/base/UsersOnCommunityWhereInput";
import { UsersOnCommunity } from "../../usersOnCommunity/base/UsersOnCommunity";
import { EntreprisesOnCommunityWhereInput } from "../../entreprisesOnCommunity/base/EntreprisesOnCommunityWhereInput";
import { EntreprisesOnCommunity } from "../../entreprisesOnCommunity/base/EntreprisesOnCommunity";
import { getListCommunityDto } from "./getListCommunity.dto";
@swagger.ApiBearerAuth()
export class CommunityControllerBase {
  constructor(
    protected readonly service: CommunityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post()
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "create",
    possession: "any",
  })
  @swagger.ApiCreatedResponse({ type: Community })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async create(
    @common.Body() data: CommunityCreateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Community> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Community"} creation is forbidden for roles: ${roles}`
      );
    }
    return await this.service.create({
      data: data,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        activityField: true,
      },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get()
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "read",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: getListCommunityDto })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiQuery({
    type: () => CommunityFindManyArgs,
    style: "deepObject",
    explode: true,
  })
  async findMany(
    @common.Req() request: Request,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<Community>> {
    const args = plainToClass(CommunityFindManyArgs, request.query);

    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Community",
    });
    const results = await this.service.findMany({
      ...args,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        activityField: true,
      },
    });
    const result = results.paginatedResult.map((result: Community) =>
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
    resource: "Community",
    action: "read",
    possession: "own",
  })
  @swagger.ApiOkResponse({ type: Community })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async findOne(
    @common.Param() params: CommunityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Community | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Community",
    });
    const result = await this.service.findOne({
      where: params,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        activityField: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return permission.filter(result);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Community })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async update(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body()
    data: CommunityUpdateInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<Community | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new errors.ForbiddenException(
        `providing the properties: ${properties} on ${"Community"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      return await this.service.update({
        where: params,
        data: data,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          activityField: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "delete",
    possession: "any",
  })
  @swagger.ApiOkResponse({ type: Community })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  async delete(
    @common.Param() params: CommunityWhereUniqueInput
  ): Promise<Community | null> {
    try {
      return await this.service.delete({
        where: params,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          name: true,
          activityField: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/offersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => OffersOnCommunityWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyOffersOnCommunities(
    @common.Req() request: Request,
    @common.Param() params: CommunityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<OffersOnCommunity[]> {
    const query: OffersOnCommunityWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "OffersOnCommunity",
    });
    const results = await this.service.findOffersOnCommunities(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        offer: {
          select: {
            id: true,
          },
        },

        community: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/offersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async createOffersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      offersOnCommunities: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/offersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async updateOffersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      offersOnCommunities: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/offersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async deleteOffersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      offersOnCommunities: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/publicationsOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => PublicationsOnCommunityWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyPublicationsOnCommunities(
    @common.Req() request: Request,
    @common.Param() params: CommunityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<PublicationsOnCommunity[]> {
    const query: PublicationsOnCommunityWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "PublicationsOnCommunity",
    });
    const results = await this.service.findPublicationsOnCommunities(
      params.id,
      {
        where: query,
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,

          publication: {
            select: {
              id: true,
              type: true,
              title: true,
              description:true,
            },
          },

          community: {
            select: {
              id: true,
            },
          },
        },
      }
    );
    console.log(results)
    return permission.filter(results);
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/publicationsOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async createPublicationsOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      publicationsOnCommunities: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/publicationsOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async updatePublicationsOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      publicationsOnCommunities: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/publicationsOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async deletePublicationsOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      publicationsOnCommunities: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/usersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => UsersOnCommunityWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyUsersOnCommunities(
    @common.Req() request: Request,
    @common.Param() params: CommunityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<UsersOnCommunity[]> {
    const query: UsersOnCommunityWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UsersOnCommunity",
    });
    const results = await this.service.findUsersOnCommunities(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        community: {
          select: {
            id: true,
          },
        },

        user: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/usersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async createUsersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      usersOnCommunities: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/usersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async updateUsersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      usersOnCommunities: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/usersOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async deleteUsersOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      usersOnCommunities: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get("/:id/entreprisesOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "read",
    possession: "any",
  })
  @swagger.ApiQuery({
    type: () => EntreprisesOnCommunityWhereInput,
    style: "deepObject",
    explode: true,
  })
  async findManyEntreprisesOnCommunities(
    @common.Req() request: Request,
    @common.Param() params: CommunityWhereUniqueInput,
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<EntreprisesOnCommunity[]> {
    const query: EntreprisesOnCommunityWhereInput = request.query;
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "EntreprisesOnCommunity",
    });
    const results = await this.service.findEntreprisesOnCommunities(params.id, {
      where: query,
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,

        entreprise: {
          select: {
            id: true,
          },
        },

        community: {
          select: {
            id: true,
          },
        },
      },
    });
    return results.map((result) => permission.filter(result));
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Post("/:id/entreprisesOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async createEntreprisesOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      entreprisesOnCommunities: {
        connect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Patch("/:id/entreprisesOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async updateEntreprisesOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      entreprisesOnCommunities: {
        set: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }

  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Delete("/:id/entreprisesOnCommunities")
  @nestAccessControl.UseRoles({
    resource: "Community",
    action: "update",
    possession: "any",
  })
  async deleteEntreprisesOnCommunities(
    @common.Param() params: CommunityWhereUniqueInput,
    @common.Body() body: CommunityWhereUniqueInput[],
    @nestAccessControl.UserRoles() userRoles: string[]
  ): Promise<void> {
    const data = {
      entreprisesOnCommunities: {
        disconnect: body,
      },
    };
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Community",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
    if (invalidAttributes.length) {
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new common.ForbiddenException(
        `Updating the relationship: ${
          invalidAttributes[0]
        } of ${"Community"} is forbidden for roles: ${roles}`
      );
    }
    await this.service.update({
      where: params,
      data,
      select: { id: true },
    });
  }
}
