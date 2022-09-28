import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { PostServiceBase } from "./base/post.service.base";

@Injectable()
export class PostService extends PostServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }




}
