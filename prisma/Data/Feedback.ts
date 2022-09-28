import  { Candidats } from './Candidate'
import {offers} from './Offer'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Feedback = [
    {
        id : "1",
        contenu : 'userCandidat' ,
        statue  : 'waiting' ,
        type     : 'candidate_role' ,
    },
    {
        id : "2",
        contenu : 'userCandidat' ,
        statue  : 'rejected' ,
        type     : 'candidate_role' ,     
    },
    {
        id : "3",
        contenu : 'userCandidat' ,
        statue  : 'inporgress' ,
        type     : 'candidate_role' ,
    },
    {
        id : "4",
        contenu : 'userCandidat' ,
        statue  : 'inporgress' ,
        type     : 'candidate_role' ,
    },
    {
        id : "5",
        contenu : 'userCandidat' ,
        statue  : 'approved' ,
        type     : 'candidate_role' ,
    },
    {
      id : "6",
      contenu : 'userCandidat' ,
      statue  : 'waiting' ,
      type     : 'candidate_role' ,
  },
  {
      id : "7",
      contenu : 'userCandidat' ,
      statue  : 'rejected' ,
      type     : 'candidate_role' ,   
  },
  {
      id : "8",
      contenu : 'userCandidat' ,
      statue  : 'inporgress' ,
      type     : 'candidate_role' ,
  },
  {
      id : "9",
      contenu : 'userCandidat' ,
      statue  : 'inporgress' ,
      type     : 'candidate_role' ,
  },
  {
      id : "10",
      contenu : 'userCandidat' ,
      statue  : 'approved' ,
      type     : 'candidate_role' ,
  },
]
export async function addFeedbacksSeedData() {
    const users = await prisma.user.findMany({
        where: { OR :[{username:{equals:"candidate6@gmail.com"}},
        {username:{equals:"candidats7@gmail.com"}} ]}
        },
      );

      const offer = await prisma.offer.findMany(
        {
       where : { 
        OR: [
            { id: "3" },
            { id: "4" },
            { id: "5" },
            { id: "7" },
            { id: "8" },
            { id: "9" },
            { id: "10" },
          ],
       }
        },
      );

   for (let i = 0; i < Feedback.length; i++) {
    for (let j=0 ; j<offer.length; j++){
      await prisma.feedback.upsert({
        where: {
          id: Feedback[i].id+"-"+offer[j].id,
        },
        update: {
            contenu: Feedback[i].contenu,
            statue: Feedback[i].statue,
            type:Feedback[i].type,
            offerId: offer[j].id,
            userId: users[Math.floor(Math.random() * 2)].id 
        },
        create: {...Feedback[i], id: Feedback[i].id+"-"+offer[j].id, offerId: offer[j].id,  userId: users[Math.floor(Math.random() * 2)].id },
      });
    }
  }
  }