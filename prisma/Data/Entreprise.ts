import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const entreprises = [
    {
        id : "1",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "2",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'

    },
    {
        id : "3",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "4",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'

    },
    {
        id : "5",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "6",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'

    },
    {
        id : "7",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "8",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'

    },
    {
        id : "9",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "10",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'

    }, {
        id : "11",
        name : 'salah 1' ,
        owner  : 'salah 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 20 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
    {
        id : "12",
        name : 'tekab 1' ,
        owner  : 'amina 1' ,
        presentationContent  : 'userCandidat' ,
        presentationVideolink  : 'vd.mp4',
        websiteLink     : 'web.com',
        linkedinLink     : 'link.com' ,
        instagramLink     : 'insta.com' ,
        departement   : 'it services',
        workersNumber : 50 ,
        email: 'company@company.dev' ,
        image: 'https://storage.googleapis.com/support-kms-prod/ZAl1gIwyUsvfwxoW9ns47iJFioHXODBbIkrK',
        coverImage:'https://media-exp1.licdn.com/dms/image/C4E16AQGiAZQfy71Wjw/profile-displaybackgroundimage-shrink_200_800/0/1661176278865?e=2147483647&v=beta&t=Pxgto5xIrEPkZwCgwRP7BeOfRUk1H4Z5ZkFYxEBvQHY'
    },
]

export async function addEntrepriseSeedData() {
    for (let i = 0; i < entreprises.length; i++) {
      await prisma.entreprise.upsert({
        where: {
            id: entreprises[i].id,
        },
        update:  {
            name : entreprises[i].name, 
            owner : entreprises[i].owner, 
            presentationContent : entreprises[i].presentationContent, 
            websiteLink : entreprises[i].websiteLink, 
            linkedinLink : entreprises[i].linkedinLink, 
            instagramLink : entreprises[i].instagramLink, 
            presentationVideolink : entreprises[i].presentationVideolink, 
            departement : entreprises[i].departement, 
            workersNumber : entreprises[i].workersNumber,
            email: entreprises[i].email,
            image: entreprises[i].image,
           
         },
        create:  entreprises[i],
      })
      
      }
    }
