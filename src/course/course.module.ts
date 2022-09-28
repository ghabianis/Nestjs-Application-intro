import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CourseModuleBase } from "./base/course.module.base";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { CourseResolver } from "./course.resolver";

@Module({
  imports: [CourseModuleBase],
  controllers: [CourseController],
  providers: [CourseService, CourseResolver, DbService],
  exports: [CourseService],
})
export class CourseModule {}
