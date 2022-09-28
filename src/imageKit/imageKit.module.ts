import { Module } from '@nestjs/common';
import { ImageKitService } from './imageKit.service';
import { ImageKitController } from './imageKit.controller';
@Module({
  providers: [ImageKitService],
  controllers: [ImageKitController],
})
export class ImageKitModule {}
