import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CommentModuleBase } from "./base/comment.module.base";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { CommentResolver } from "./comment.resolver";

@Module({
  imports: [CommentModuleBase],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver, DbService],
  exports: [CommentService],
})
export class CommentModule {}
