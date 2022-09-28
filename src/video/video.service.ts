import { Global, Injectable, Options } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "nestjs-prisma";
import { DbService } from "src/dbService/db.service";
import { VideoServiceBase } from "./base/video.service.base";
import FormData, { Readable } from 'form-data';
import fs from 'fs';
var querystring = require('querystring');
var tus = require('tus-js-client');
import { createReadStream, ReadStream } from 'fs';
import { Upload } from "tus-js-client";
import { Prisma, Socialinterraction, Publication, User, Storiesview, PostsView, Eventsview, Videoview, Offersview, Retcheeview, UserLikesView, CandidateCommunityView, Notification, prisma } from "@prisma/client";

@Injectable()
export class VideoService extends VideoServiceBase {
  constructor(protected readonly prisma: DbService, private readonly prismaService: PrismaService) {
    super(prisma);
  }
  that = this;
  async cloudFlareUploadVideo(pt: any, fname: any, filetype: any) {
    var gloablthis = this.that
    const upload = new tus.Upload(pt, {
      endpoint: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
      },
      chunkSize: 50 * 1024 * 1024, // Required a minimum chunk size of 5MB, here we use 50MB.
      retryDelays: [0, 3000, 5000, 10000, 20000],
      metadata: {
        filename: fname,
        filetype: filetype
      },
      onError: function (error: any) {
        console.log("Failed because: " + error)
      },
      onProgress: function (bytesUploaded: any, bytesTotal: any) {
        var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
        console.log(bytesUploaded, bytesTotal, percentage + "%")
      },
      onSuccess: function () {
        console.log("uploaded successfully :)")
        console.log(upload.url)
        const res = axios({
          url: `${upload.url}`,
          method: 'GET',
          headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`,
          },
        }).then(async (res) => {
          await gloablthis.prismaService.video.create({
            data: {
              id: res.data.result.uid,
              createdAt: res.data.result.created,
              updatedAt: res.data.result.modified,
              url: res.data.result.preview,
              categoryId: null,
              publicationId: null,
              entrepriseId: null,
            }
          })
        })

      },

    })
    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads: any) {
      // Found previous uploads so we select the first one. 
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0])
      }
      // Start the upload

      upload.start()
    })
    async function dd() {
      await console.log(Options)
    }
  }
}
