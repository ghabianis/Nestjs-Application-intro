
import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

import { PasswordService } from "../auth/password.service";


@Injectable()
export class LanguageService {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
   
  }
}