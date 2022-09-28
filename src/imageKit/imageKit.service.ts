import { Injectable } from '@nestjs/common';
import imageKit from './imageKit.config';

@Injectable()
export class ImageKitService {
    constructor(){}
     getImageKitAuth(){
        return  imageKit.getAuthenticationParameters()
        }
}