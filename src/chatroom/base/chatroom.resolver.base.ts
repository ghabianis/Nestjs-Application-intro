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
import { CreateChatroomArgs } from "./CreateChatroomArgs";
import { UpdateChatroomArgs } from "./UpdateChatroomArgs";
import { DeleteChatroomArgs } from "./DeleteChatroomArgs";
import { ChatroomFindManyArgs } from "./ChatroomFindManyArgs";
import { ChatroomFindUniqueArgs } from "./ChatroomFindUniqueArgs";
import { Chatroom } from "./Chatroom";
import { CandidatesOnChatroomFindManyArgs } from "../../candidatesOnChatroom/base/CandidatesOnChatroomFindManyArgs";
import { CandidatesOnChatroom } from "../../candidatesOnChatroom/base/CandidatesOnChatroom";
import { Entreprise } from "../../entreprise/base/Entreprise";
import { ChatroomService } from "../chatroom.service";

@graphql.Resolver(() => Chatroom)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ChatroomResolverBase {
  constructor(
    protected readonly service: ChatroomService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "read",
    possession: "any",
  })
  async _chatroomsMeta(
    @graphql.Args() args: ChatroomFindManyArgs
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

  @graphql.Query(() => [Chatroom])
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "read",
    possession: "any",
  })
  async chatrooms(
    @graphql.Args() args: ChatroomFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<PaginatedInterface<Chatroom>> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Chatroom",
    });
    const results = await this.service.findMany(args);
    const result = results.paginatedResult.map((result: Chatroom) =>
      permission.filter(result)
    );
    return { paginatedResult: result, totalCount: results.totalCount };
  }

  @graphql.Query(() => Chatroom, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "read",
    possession: "own",
  })
  async chatroom(
    @graphql.Args() args: ChatroomFindUniqueArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chatroom | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "own",
      resource: "Chatroom",
    });
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return permission.filter(result);
  }

  @graphql.Mutation(() => Chatroom)
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "create",
    possession: "any",
  })
  async createChatroom(
    @graphql.Args() args: CreateChatroomArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chatroom> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "create",
      possession: "any",
      resource: "Chatroom",
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
        `providing the properties: ${properties} on ${"Chatroom"} creation is forbidden for roles: ${roles}`
      );
    }
    // @ts-ignore
    return await this.service.create({
      ...args,
      data: {
        ...args.data,

        entreprise: args.data.entreprise
          ? {
              connect: args.data.entreprise,
            }
          : undefined,
      },
    });
  }

  @graphql.Mutation(() => Chatroom)
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "update",
    possession: "any",
  })
  async updateChatroom(
    @graphql.Args() args: UpdateChatroomArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Chatroom | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "update",
      possession: "any",
      resource: "Chatroom",
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
        `providing the properties: ${properties} on ${"Chatroom"} update is forbidden for roles: ${roles}`
      );
    }
    try {
      // @ts-ignore
      return await this.service.update({
        ...args,
        data: {
          ...args.data,

          entreprise: args.data.entreprise
            ? {
                connect: args.data.entreprise,
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

  @graphql.Mutation(() => Chatroom)
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "delete",
    possession: "any",
  })
  async deleteChatroom(
    @graphql.Args() args: DeleteChatroomArgs
  ): Promise<Chatroom | null> {
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

  @graphql.ResolveField(() => [CandidatesOnChatroom])
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "read",
    possession: "any",
  })
  async candidatesOnChatrooms(
    @graphql.Parent() parent: Chatroom,
    @graphql.Args() args: CandidatesOnChatroomFindManyArgs,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<CandidatesOnChatroom[]> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "CandidatesOnChatroom",
    });
    const results = await this.service.findCandidatesOnChatrooms(
      parent.id,
      args
    );

    if (!results) {
      return [];
    }

    return results.map((result) => permission.filter(result));
  }

  @graphql.ResolveField(() => Entreprise, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Chatroom",
    action: "read",
    possession: "any",
  })
  async entreprise(
    @graphql.Parent() parent: Chatroom,
    @gqlUserRoles.UserRoles() userRoles: string[]
  ): Promise<Entreprise | null> {
    const permission = this.rolesBuilder.permission({
      role: userRoles,
      action: "read",
      possession: "any",
      resource: "Entreprise",
    });
    const result = await this.service.getEntreprise(parent.id);

    if (!result) {
      return null;
    }
    return permission.filter(result);
  }
}
