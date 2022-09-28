import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { PostModuleBase } from "./base/post.module.base";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PostResolver } from "./post.resolver";

@Module({
  imports: [PostModuleBase],
  controllers: [PostController],
  providers: [PostService, PostResolver, DbService],
  exports: [PostService],
})
export class PostModule {}
