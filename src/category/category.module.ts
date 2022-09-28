import { Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { CategoryModuleBase } from "./base/category.module.base";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { CategoryResolver } from "./category.resolver";

@Module({
  imports: [CategoryModuleBase],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryResolver, DbService],
  exports: [CategoryService],
})
export class CategoryModule {}
