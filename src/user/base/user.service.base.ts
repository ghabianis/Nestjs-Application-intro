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
import { PrismaService } from "nestjs-prisma";

import {
  Prisma,
  User,
  Comment,
  Feedback,
  Publication,
  Socialinterraction,
  UsersOnCommunity,
  UsersOnEntreprise,
  UsersSkill,
  Candidate,
  Recruiter,
} from "@prisma/client";

import { PaginatedInterface } from "../../util/PaginatedInterface";
import { PasswordService } from "../../auth/password.service";
import { transformStringFieldUpdateInput } from "../../prisma.util";

export class UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {}

  async count<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ): Promise<number> {
    return this.prisma.user.count(args);
  }

  async findMany<T extends Prisma.UserFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ): Promise<PaginatedInterface<User>> {
    const [data, totalCount] = await Promise.all([
      this.prisma.user.findMany(args),
      this.prisma.user.count(),
    ]);

    return { paginatedResult: data, totalCount };
  }
  async findOne<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ): Promise<User | null> {
    return this.prisma.user.findUnique(args);
  }
  async create<T extends Prisma.UserCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>
  ): Promise<User> {
    return this.prisma.user.create<T>({
      ...args,

      data: {
        ...args.data,
        password: await this.passwordService.hash(args.data.password),
      },
    });
  }
  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<User> {
    return this.prisma.user.update<T>({
      ...args,

      data: {
        ...args.data,

        password:
          args.data.password 
          &&
          (await transformStringFieldUpdateInput(
            args.data.password,
            (password) => this.passwordService.hash(password)
          )),
      },
    });
  }
  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<User> {
    return this.prisma.user.delete(args);
  }

  async findComments(
    parentId: string,
    args: Prisma.CommentFindManyArgs
  ): Promise<Comment[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .comments(args);
  }

  async findFeedbacks(
    parentId: string,
    args: Prisma.FeedbackFindManyArgs
  ): Promise<Feedback[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .feedbacks(args);
  }

  async findPublications(
    parentId: string,
    args: Prisma.PublicationFindManyArgs
  ): Promise<Publication[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .publications(args);
  }

  async findSocialinterractions(
    parentId: string,
    args: Prisma.SocialinterractionFindManyArgs
  ): Promise<Socialinterraction[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .socialinterractions(args);
  }

  async findUsersOnCommunities(
    parentId: string,
    args: Prisma.UsersOnCommunityFindManyArgs
  ): Promise<UsersOnCommunity[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .usersOnCommunities(args);
  }

  async findUsersOnEntreprises(
    parentId: string,
    args: Prisma.UsersOnEntrepriseFindManyArgs
  ): Promise<UsersOnEntreprise[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .usersOnEntreprises(args);
  }

  async findUsersSkills(
    parentId: string,
    args: Prisma.UsersSkillFindManyArgs
  ): Promise<UsersSkill[]> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .usersSkills(args);
  }

  async getCandidate(parentId: string): Promise<Candidate | null> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .candidate();
  }

  async getRecruiter(parentId: string): Promise<Recruiter | null> {
    return this.prisma.user
      .findUnique({
        where: { id: parentId },
      })
      .recruiter();
  }
}
