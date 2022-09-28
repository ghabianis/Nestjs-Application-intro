
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const offers = [
/*     {
        id : '1',
        publicationId : '1',
        place : "paris",
        renumeration:"renumeration1",
        offerType :"offer1",
        maxExperience : 5,
        
    },
    {
        id : '2',
        publicationId : '2',
        place : "marseille",
        renumeration:"renumeration2",
        offerType :"offer2",
        maxExperience : 6,
        
    }, */
    {
        id : '3',
        publicationId : '3',
        place : "paris",
        renumeration:"renumeration3",
        offerType :"media",
        maxExperience : 5,
        
    },
    {
        id : '4',
        publicationId : '4',
        place : "marseille",
        renumeration:"renumeration4",
        offerType :"media",
        maxExperience : 6,
        
    },   
    {
        id : '5',
        publicationId : '5',
        place : "paris",
        renumeration:"renumeration5",
        offerType :"media",
        maxExperience : 5,
        
    },
/*     {
        id : '6',
        publicationId : '6',
        place : "marseille",
        renumeration:"renumeration6",
        offerType :"offer6",
        maxExperience : 5,
        
    },  */ 
    {
        id : '7',
        publicationId : '28',
        place : "paris",
        renumeration:"renumeration7",
        offerType :"media",
        maxExperience : 5,
        
    },
    {
        id : '8',
        publicationId : '29',
        place : "marseille",
        renumeration:"renumeration8",
        offerType :"media",
        maxExperience : 6,
        
    },
    {
        id : '9',
        publicationId : '30',
        place : "paris",
        renumeration:"renumeration9",
        offerType :"media",
        maxExperience : 6,
       
    },
    {
        id : '10',
        publicationId : '51',
        place : "marseille",
        renumeration:"renumeration10",
        offerType :"media",
        maxExperience : 6,
     
    },
]

const questions = [
    {
        title : 'question1',
        description : 'description1',
        videoId : '1',
    },
    {
        title : 'question2',
        description : 'description2',
        videoId : '1',
    },
    {
        title : 'question3',
        description : 'description3',
        videoId : '2',
    },
    {
        title : 'question4',
        description : 'description4',
        videoId : '2',
    }
]
export async function addOffersSeedData() {
    for (let i = 0; i < offers.length; i++) {
        for(let j=0;  j< questions.length ; j++){
      await prisma.offer.upsert({
        where: {
            publicationId: offers[i].publicationId,
        },
        update:  {
             place : offers[i].place ,
             renumeration : offers[i].renumeration ,
             offerType : offers[i].offerType ,
             maxExperience : offers[i].maxExperience ,
             questions : {
                
                create :{
                    title : questions[j].title,
                    description : questions[j].description,
                    videoId : questions[j].videoId
                }
             }
         },
        create: {
            ...offers[i],
            questions : {
                create :{
                    title : questions[j].title,
                    description : questions[j].description,
                    videoId : questions[j].videoId
                }
        } 
      }})}
      
      }
  
  }   