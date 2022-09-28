import  { Candidats } from './Candidate'
import { Recruiter } from './Recruiter'
import { Users } from './Users'
import { publications } from './Publications'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export const Post = [
    {
        id : "1",
        createdAt : '2020-08-05T00:00:00.00Z' ,
        updatedAt : '2020-08-05T00:00:00.00Z' ,
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  : '2' ,
        publicationId  : publications[14].id,
    },
    {
        id : "2",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH1_rE-1kS7Jx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230249685' ,
        entrepriseId  : '2',
        publicationId  : publications[15].id,
    },
    
    
    {
        id : "3",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/Contenu_p7k1q2q6L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230217348' ,
        entrepriseId  :'2',
        publicationId  : publications[16].id,
    },

    {
        id : "4",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH1_rE-1kS7Jx.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230249685' ,
        entrepriseId  :'2',
        publicationId  : publications[17].id,
    },
    {
        id : "5",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/Contenu_p7k1q2q6L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230217348' ,
        entrepriseId  :'2',
        publicationId  : publications[18].id,
    },
    {
        id : "6",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  :'2',
        publicationId  : publications[24].id,
    },
    {
        id : "7",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/Contenu_p7k1q2q6L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230217348' ,
        entrepriseId  :'1',
        publicationId  : publications[39].id,
    },
    {
        id : "8",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  :'1',
        publicationId  : publications[40].id,
    },
        {
        id : "9",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  :'1',
        publicationId  : publications[41].id,
    },
    {
        id : "10",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/Contenu_p7k1q2q6L.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230217348' ,
        entrepriseId  :'1',
        publicationId  : publications[42].id,
    },
    {
        id : "11",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  :'1',
        publicationId  : publications[43].id,
    },
    {
        id : "12",
        createdAt : '2020-08-05T00:00:00.00Z',
        updatedAt : '2020-08-05T00:00:00.00Z',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/RH2_1Mviaetjk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230233292' ,
        entrepriseId  :'1',
        publicationId  : publications[49].id,
    },
]

export async function addPostsSeedData() {
    for (let i = 0; i < Post.length; i++) {
        console.log('ddd=>',Post[i].publicationId)
      await prisma.post.upsert({
        where: {
            id: Post[i].id,
        },
        update:  {
            publicationId : Post[i].publicationId ,
            entrepriseId : Post[i].entrepriseId
           
         },
        create:  Post[i],
      })
      
      }
    }
