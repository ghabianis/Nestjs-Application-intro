import { ImageKitService } from './imageKit.service';
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";

@common.Controller('image-kit')
@swagger.ApiTags("image-kit")
export class ImageKitController {
    constructor(private imageKitService: ImageKitService){}
    @common.Get()
    getImageKitAuth(){
        return this.imageKitService.getImageKitAuth()
    }
}
