import { PrismaClient ,EnumTypePub} from "@prisma/client";
const prisma = new PrismaClient();

const categories  = [
    {
        id : '1',
        label : 'Tutoriel',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/MicrosoftTeams-image__3__cu_9ekqQg.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663234604345'

    },
    {
        id : '2',
        label : 'Feedback',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/MicrosoftTeams-image__2__5z6colUNB.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663234602472'

    },
    {
        id : '3',
        label : 'Convocation Entretien',
        image  :'https://ik.imagekit.io/etpicxhlw/images_videos/MicrosoftTeams-image__1__yaW4CL4A1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663234603554'

    },
    {
        id : '4',
        label : 'Stretching',
        image : 'https://ik.imagekit.io/etpicxhlw/images_videos/MicrosoftTeams-image_bSW_0Hdak.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663234602919'

    },
]

export async function addCategoriesSeedData() {
    for (let i = 0; i < categories.length; i++) {
      await prisma.category.upsert({
        where: {
            id: categories[i].id,
        },
        update:  {
            id : categories[i].id ,
            label : categories[i].label
           
         },
        create:  categories[i],
      })
      
      }
    }
