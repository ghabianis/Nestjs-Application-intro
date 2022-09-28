import { Module } from "@nestjs/common";
import { LanguageController } from "./language.controller";
import { LanguageService } from "./language.service";

@Module({
  controllers: [LanguageController],
  providers: [LanguageService],
  exports: [LanguageService],
})
export class LanguageModule {}
