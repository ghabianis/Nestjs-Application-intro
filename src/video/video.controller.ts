import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { VideoService } from "./video.service";
import { VideoControllerBase } from "./base/video.controller.base";
import { BadRequestException, Body, Get, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import multer, { diskStorage } from "multer";
import { extname } from 'path';
import { VideoCreateInput } from "./base/VideoCreateInput";
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

@swagger.ApiTags("videos")
@common.Controller("videos")
export class VideoController extends VideoControllerBase {
  constructor(
    protected readonly service: VideoService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async cloudFlareUploadVideo(@UploadedFile() file: any
  ) {
    console.log(file)
    return await this.service.cloudFlareUploadVideo(file.buffer, file.originalname, file.mimetype)
  }
}
