import { Global, Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { VideoModuleBase } from "./base/video.module.base";
import { VideoService } from "./video.service";
import { VideoController } from "./video.controller";
import { VideoResolver } from "./video.resolver";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [VideoModuleBase],
  controllers: [VideoController],
  providers: [VideoService, VideoResolver, DbService],
  exports: [VideoService],
})
export class VideoModule { }
