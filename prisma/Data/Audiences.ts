import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


export const FollowEntrepriseUpSert = [{
    id :"1",
    candidate: {
        connect: {
            id: "1",
        }
    },
    entreprise: {
        connect: {
            id: "1"
        }
    }

},
{
    id :"2",
    candidate: {
        connect: {
            id: "1",
        }
    },
    entreprise: {
        connect: {
            id: "2"
        }
    }

},
{
    id :"3",
    candidate: {
        connect: {
            id: "2",
        }
    },
    entreprise: {
        connect: {
            id: "5"
        }
    }

},
{
    id :"4",
    candidate: {
        connect: {
            id: "2",
        }
    },
    entreprise: {
        connect: {
            id: "7"
        }
    }

},
{
    id :"5",
    candidate: {
        connect: {
            id: "1",
        }
    },
    entreprise: {
        connect: {
            id: "7"
        }
    }

},
]

export async function addAudiencesSeedData() {
    for (let i = 0; i < FollowEntrepriseUpSert.length; i++) {
        
        await prisma.followEntreprise.upsert({
            where: {
                id: FollowEntrepriseUpSert[i].id,
            },
            update: FollowEntrepriseUpSert[i],
            create: FollowEntrepriseUpSert[i]
        })
        
    }
}
