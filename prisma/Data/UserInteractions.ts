import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const UserInteractions = [{
    id :"1",
    user: {
        connect: {
            username: "recruiter2@gmail.com",
        }
    },
    publication: {
        connect: {
            id: "1"
        }
    },
},
{
    id :"100",
    user: {
        connect: {
            username: "recruiter2@gmail.com",
        }
    },
    publication: {
        connect: {
            id: "1"
        }
    },
    
},
{
    id :"999",
    user: {
        connect: {
            username: "recruiter2@gmail.com",
        }
    },
    publication: {
        connect: {
            id: "1"
        }
    },
    type:'like'
    
}
]

export async function addUserInteractions() {
    /* Upsert*/
    for (let i = 0; i < UserInteractions.length; i++) {

        console.log(UserInteractions[i])
        
        await prisma.socialinterraction.upsert({
            where: {
                id: UserInteractions[i].id,
            },
            update: UserInteractions[i],
            create: UserInteractions[i]
        })
        
    }
}
