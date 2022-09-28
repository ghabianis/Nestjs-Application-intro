import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {publications} from './Publications'
 const videos= [
    {
        id : "1",
        entrepriseId : '2',
        publicationId : publications[10].id,
        categoryId : '1',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'

    },
    {
        id : "2",
        entrepriseId : '2',
        publicationId : publications[12].id,
        categoryId : '2',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "3",
        entrepriseId : '2',
        publicationId : publications[13].id,
        categoryId : '3',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "4",
        entrepriseId : '1',
        publicationId : publications[35].id,
        categoryId :'4',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "5",
        entrepriseId : '1',
        publicationId : publications[37].id,
        categoryId : '3',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "6",
        entrepriseId : '1',
        publicationId : publications[38].id,
        categoryId :'4',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "7",
        entrepriseId : '2',
        publicationId : publications[51].id,
        categoryId : '3',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "8",
        entrepriseId : '1',
        publicationId : publications[52].id,
        categoryId :'4',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "9",
        entrepriseId : '1',
        publicationId : publications[53].id,
        categoryId : '3',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
    {
        id : "10",
        entrepriseId : '1',
        publicationId : publications[54].id,
        categoryId :'4',
        url: 'https://customer-d0i4dqrmfsaquwtj.cloudflarestream.com/d801dd5cc4e045bde050e7185a1a5afe/watch'
    },
]

export async function addVideoSeedData() {
    for (let i = 0; i < videos.length; i++) {
      await prisma.video.upsert({
        where: {
            id: videos[i].id,
        },
        update:  {
            publicationId : videos[i].publicationId ,
            categoryId : videos[i].categoryId
           
         },
        create:  videos[i],
      })
      
      }
    }
