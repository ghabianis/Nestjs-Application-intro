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
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import * as gqlUserRoles from "../../auth/gqlUserRoles.decorator";
import * as abacUtil from "../../auth/abac.util";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import { PaginatedInterface } from "../../util/PaginatedInterface";
import { CreateUsersOnCommunityArgs } from "./CreateUsersOnCommunityArgs";
import { UpdateUsersOnCommunityArgs } from "./UpdateUsersOnCommunityArgs";
import { DeleteUsersOnCommunityArgs } from "./DeleteUsersOnCommunityArgs";
import { UsersOnCommunityFindManyArgs } from "./UsersOnCommunityFindManyArgs";
import { UsersOnCommunityFindUniqueArgs } from "./UsersOnCommunityFindUniqueArgs";
import { UsersOnCommunity } from "./UsersOnCommunity";
import { Community } from "../../community/base/Community";
import { User } from "../../user/base/User";
import { UsersOnCommunityService } from "../usersOnCommunity.service";

@graphql.Resolver(() => UsersOnCommunity)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UsersOnCommunityResolverBase {
  constructor(
    protected readonly service: UsersOnCommunityService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "read",
    possession: "any",
  })
  async _usersOnCommunitiesMeta(
    @graphql.Args() args: UsersOnCommunityFindManyArgs
  ): Promise<MetaQueryPayload> {
    const results = await this.service.count({
      ...args,
      skip: undefined,
      take: undefined,
    });
    return {
      count: results,
    };
  }

  @graphql.Query(() => [UsersOnCommunity])
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "read",
    possession: "any",
  })
  async usersOnCommunities(
    @graphql.Args() args: UsersOnCommunityFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<UsersOnCommunity>> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "UsersOnCommunity",
    });
    const results = await this.service.findMany(args);
    const result = results.paginatedResult.map((result: UsersOnCommunity) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @graphql.Query(() => UsersOnCommunity, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "read",
    possession: "own",
  })
  async usersOnCommunity(
    @graphql.Args() args: UsersOnCommunityFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UsersOnCommunity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "UsersOnCommunity",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => UsersOnCommunity)
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "create",
    possession: "any",
  })
  async createUsersOnCommunity(
    @graphql.Args() args: CreateUsersOnCommunityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UsersOnCommunity> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "UsersOnCommunity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"UsersOnCommunity"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        community: args.data.community
          ? {
              connect: args.data.community,
            }
          : undefined,

        user: args.data.user
          ? {
              connect: args.data.user,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => UsersOnCommunity)
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "update",
    possession: "any",
  })
  async updateUsersOnCommunity(
    @graphql.Args() args: UpdateUsersOnCommunityArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<UsersOnCommunity | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "UsersOnCommunity",
    });
    const invalidAttributes = abacUtil.getInvalidAttributes(
      permission,
      args.data
    );
    if (invalidAttributes.length) {
      const properties = invalidAttributes
        .map((attribute: string) => JSON.stringify(attribute))
        .join(", ");
      const roles = userRoles
        .map((role: string) => JSON.stringify(role))
        .join(",");
      throw new apollo.ApolloError(
        `providing the properties: ${properties} on ${"UsersOnCommunity"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          community: args.data.community
            ? {
                connect: args.data.community,
              }
            : undefined,

          user: args.data.user
            ? {
                connect: args.data.user,
              }
            : undefined,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.Mutation(() => UsersOnCommunity)
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "delete",
    possession: "any",
  })
  async deleteUsersOnCommunity(
    @graphql.Args() args: DeleteUsersOnCommunityArgs
  ): Promise<UsersOnCommunity | null> {
    try {
      // @ts-ignore
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }

  @graphql.ResolveField(() => Community, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "read",
    possession: "any",
  })
  async community(
    @graphql.Parent() parent: UsersOnCommunity,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Community | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Community",
    });
    const result = await this.service.getCommunity(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.ResolveField(() => User, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "UsersOnCommunity",
    action: "read",
    possession: "any",
  })
  async user(
    @graphql.Parent() parent: UsersOnCommunity,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<User | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "User",
    });
    const result = await this.service.getUser(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
