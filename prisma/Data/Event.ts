import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import {publications} from './Publications'
 const events= [
    {
        id : "1",
        speakers: "",
        publicationId : publications[6].id,
        location : 'location1',
        file : 'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements_GALY1I1Io.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663229749131'

    },
    {
        id : "2",
        speakers: "",    
        publicationId : publications[7].id,
        location : 'location2',
        file : 'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "3",
        speakers: "",  
        publicationId : publications[8].id,
        location : 'location1',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements_GALY1I1Io.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663229749131'
    },
    {
        id : "4",
        speakers: "",    
        publicationId : publications[9].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "5",
        speakers: "",    
        publicationId : publications[22].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements_GALY1I1Io.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663229749131'

    },
    {
        id : "6",
        speakers: "",    
        publicationId : publications[23].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "7",
        speakers: "",    
        publicationId : publications[31].id,
        location : 'location2',
        file : 'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "8",
        speakers: "",  
        publicationId : publications[32].id,
        location : 'location1',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements_GALY1I1Io.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663229749131'
    },
    {
        id : "9",
        speakers: "",    
        publicationId : publications[33].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "10",
        speakers: "",    
        publicationId : publications[34].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements_GALY1I1Io.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663229749131'

    },
    {
        id : "11",
        speakers: "",    
        publicationId : publications[47].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
    {
        id : "12",
        speakers: "",    
        publicationId : publications[48].id,
        location : 'location2',
        file :'https://ik.imagekit.io/etpicxhlw/images_videos/%C3%A9v%C3%A8nements2_dJbPGlyjW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663230185070'

    },
]

export async function addEventSeedData() {
    for (let i = 0; i < events.length; i++) {
      await prisma.event.upsert({
        where: {
            id: events[i].id,
        },
        update:  {
            publicationId : events[i].publicationId ,
            location : events[i].location
           
         },
        create:  events[i],
      })
      
      }
    }
