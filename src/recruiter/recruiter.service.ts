import { BadRequestException, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { RecruiterServiceBase } from "./base/recruiter.service.base";
import { Prisma, Socialinterraction, Publication, User, Storiesview, PostsView, Eventsview, Videoview, Offersview, Retcheeview, UserLikesView, Notification } from "@prisma/client";
import {
  EmailResetPasswordCredential,
  ResetPasswordCredential,
  UserCredentials,
} from "./RecruiterCredentials";
import { UserService } from "src/user/user.service";
import { ConfigService } from "@nestjs/config";
import { TokenService } from "src/auth/token.service";
import { JwtService } from "@nestjs/jwt";
import { Cache } from "cache-manager";
import { Body, CACHE_MANAGER, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import { PasswordService } from "src/auth/password.service";
const sendGridMail = require('@sendgrid/mail');
@Injectable()
export class RecruiterService extends RecruiterServiceBase {
  constructor(protected readonly prisma: DbService,
    private readonly userService: UserService,
    protected readonly passwordService: PasswordService,
    protected readonly prismaService: PrismaService,
  ) {
    super(prisma);
    // sgMail.setApiKey(this.configService.get<any>('SENDGRID_API_KEY'));
  }


//create recruiter and send email containing hashed email
  async signUp(credentials: UserCredentials): Promise<User> {
    if(credentials.role ==='recruiter_role'){
      credentials.password = ''
    }
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
        console.log("response      ", response);
        if (credentials.role?.toLowerCase() === "recruiter_role") {
          const createUser = await this.userService.update({
            where: {
              id: response.data.id,
            },
            data: {
              email: credentials.email,
              username: credentials.email,
              password: credentials.password,
              candidate: {
                create: { minSalary: 0, maxSalary: 2000 },
              },
            },
          });
        }
        return response.data;
      })
      .catch((error) => {
        console.log("catch", error.response);
        throw new BadRequestException(error.response?.data);
      });
  }


//Send email contain hashed email
  async sendAnEmail(email: any, accessToken: any) {
    try {
      sendGridMail.setApiKey("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");

      await sendGridMail.send({
        from: "anis.ghabi@tekab.dev",
        to: `${email}`,
        text: 'Fill your password now : ' + `${accessToken}`,
        // templateId: "d-a5de52b41fb0414b90247d71e1f648eb",
        personalizations: [
          {
            to: `${email}`,
            subject: "set your password please",
            dynamicTemplateData: {
              textmail: 'Fill your password now : ' + `${accessToken}`,
              subject: "new subject",
            },
          },
        ],
      })
        .then(() => {
          console.log("Email sent");
        })
    } catch (e) { console.log("error", e); }
  }

//Update invited user password depending on the email
  async updateUserPassword<T extends Prisma.UserUpdateArgs>(args: any) {
    const res = await this.passwordService.compare(args.email, args.token)
    if (res && args.password != '') {
      const resp = await this.prismaService.user.findUnique({
        where: {
          username: args.email
        },
        select: {
          id:true,
          email: true,
          password: true,
        }
      })
      return await axios
        .put(
          (process.env.KONG_URL || "") + `/auth/v1/admin/users/${resp?.id}`,
          {
            "password": args.password,
            "email_confirm" : true
          },
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.ANON_KEY || "",
              Authorization: `Bearer ${process.env.SERVICE_ROLE_KEY || ""}`,
            },
          }
        )
        
    }


  }
}