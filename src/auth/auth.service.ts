import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { registerEnumType } from "@nestjs/graphql";
// @ts-ignore
// eslint-disable-next-line
import { UserService } from "../user/user.service";
import { Credentials } from "./Credentials";
import { PrismaService } from "nestjs-prisma";
import { PasswordService } from "./password.service";
import { TokenService } from "./token.service";
import { UserInfo, User } from "./UserInfo";
import {
  EmailResetPasswordCredential,
  ResetPasswordCredential,
  UserCredentials,
} from "./Credentials";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { CandidateService } from "src/candidate/candidate.service";
import { CandidateCreateInput } from "src/candidate/base/CandidateCreateInput";
import { UserCreateInput } from "src/user/base/UserCreateInput";
import { CreateContractArgs } from "src/contract/base/CreateContractArgs";
import { Contract } from "src/contract/base/Contract";
import { ContractCreateInput } from "src/contract/base/ContractCreateInput";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    protected readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly candidateService: CandidateService
  ) {}

  async validateUser(
    username: string,
    password: string
  ): Promise<UserInfo | null> {
    const user = await this.userService.findOne({
      where: { username },
    });
    if (user && (await this.passwordService.compare(password, user.password))) {
      const { roles } = user;
      return { username, roles };
    }
    return null;
  }
  async login(credentials: Credentials): Promise<UserInfo> {
    const { username, password } = credentials;
    const user = await this.validateUser(
      credentials.username,
      credentials.password
    );
    if (!user) {
      throw new UnauthorizedException("The passed credentials are incorrect");
    }
    //@ts-ignore
    const accessToken = await this.tokenService.createToken(username, password);
    return {
      accessToken,
      ...user,
    };
  }

  async signUp(credentials: UserCredentials): Promise<User> {
    if (
      credentials.role?.toLowerCase() === "service_role" ||
      credentials.role?.toLowerCase() === "admin" ||
      credentials.role?.toLowerCase() === "super-admin"
    ) {
      throw new UnauthorizedException(
        `You can't sign up with the role ${credentials.role}`
      );
    }
    /* todo user create user supabase service client */
    return await axios
      .post(
        (process.env.KONG_URL || "") + "/auth/v1/admin/users",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.ANON_KEY || "",
            Authorization: `Bearer ${process.env.SERVICE_ROLE_KEY || ""}`,
          },
        }
      )
      .then(async (response) => {
        console.log("response      ",response);
        if (credentials.role?.toLowerCase() === "candidate_role") {
          const createUser = await this.userService.update({
            where: {
              id: response.data.id,
            },
            data: {
              email: credentials.email,
              username: credentials.email,
              candidate: {
                create: { minSalary: 0, maxSalary: 2000 },
              },
            },
          });
        }

        return response.data;
      })

      .catch((error) => {
        console.log("catch",error.response);
        throw new BadRequestException(error.response?.data);
      });
  }

  async sendEmailToResetPassword(credential: EmailResetPasswordCredential) {
    const supabase = createClient(
      "http://kong:8000",
      process.env.SERVICE_ROLE_KEY || ""
    );

    const redirectTo = process.env.SITE_URL + "/auth/reset-password";
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      credential.email,
      {
        redirectTo,
      }
    );
    if (data) {
      return data;
    } else {
      return error;
    }
  }

  async resetPassword(credentials: ResetPasswordCredential) {
    const supabase = createClient(
      "http://kong:8000",
      process.env.SERVICE_ROLE_KEY || ""
    );
    const { data, error } = await supabase.auth.api.updateUser(
      credentials.access_token,
      {
        password: credentials.password,
      }
    );
    if (data) {
      return data;
    } else {
      return error;
    }
  }

  //******* fix dto  */
  async createUserCandidate(
    idUser: string,
    candidateId: string | undefined,
    userCandidate: CandidateCreateInput
  ) {
    console.log("userCandidate", userCandidate);
    
    let user = {
      id: idUser,
      firstName: userCandidate.user.firstName,
      lastName: userCandidate.user.lastName,
      username: userCandidate.user.username,
      password: userCandidate.user.password,
      roles: userCandidate.user.roles,
      phone: userCandidate.user.phone,
      sex: userCandidate.user.sex,
      kmRadius: userCandidate.user.kmRadius,
      city: userCandidate.user.city,
      photo: userCandidate.user.photo,
    };

    let candidate = {
      activityField: userCandidate.activityField,
      wantedPost: userCandidate.wantedPost,
      languages: userCandidate.languages,
      // experiencesYears :userCandidate.experiencesYears,
      // tags   : userCandidate.tags,
      maxSalary: userCandidate.maxSalary,
      minSalary: userCandidate.minSalary,
      personalCv: userCandidate.personalCv,
      mediaLink: userCandidate.mediaLink,
      job: userCandidate.job
        ? {
            connect: userCandidate.job,
          }
        : undefined,

      candidatelanguage: userCandidate.candidateLanguage
        ? {
            create: userCandidate.candidateLanguage?.map((language) => {
              return {
                language: { connect: { id: language } },
                createdat: new Date(),
                updatedat: new Date(),
              };
            }),
          }
        : undefined,

      candidatecommunity: userCandidate.candidateCommunities
        ? {
            create: userCandidate.candidateCommunities?.map((community) => {
              return {
                community: { connect: { id: community } },
                createdat: new Date(),
                updatedat: new Date(),
              };
            }),
          }
        : undefined,
    };
    const createUser = await this.userService.update({
      where: {
        id: idUser,
      },
      data: {
        ...user,
        candidate: {
          upsert: userCandidate
            ? {
                update: {
                  ...candidate,
                  contractsOnCandidates: userCandidate.contractsOnCandidates
                    ? {
                        deleteMany:  { candidateId: candidateId },
                        createMany: {
                          data: userCandidate?.contractsOnCandidates.map(
                            (value) => {
                              return { contractId: value };
                            }
                          ),
                        },
                      }
                    : undefined,
                },
                create: {
                  ...candidate,
                },
              }
            : undefined,
        },
      },
      select: { id: true, email: true, phone: true, candidate: true },
    });

    return createUser;
  }
}
