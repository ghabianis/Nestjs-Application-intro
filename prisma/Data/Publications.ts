
import { PrismaClient ,EnumTypePub} from "@prisma/client";
const prisma = new PrismaClient();
import {Users} from './Users'
export const publications = [
    {
        id : '1',
        type : EnumTypePub["story"],
        storyId : '1',
        title:"pub1",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
       
    },
    {
        id : '2',
        type :  EnumTypePub['story'],
        storyId : '2',
        title:"pub1",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '3',
        type :  EnumTypePub['offer'],
        offerId: '3',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '4',
        type :  EnumTypePub['offer'],
        offerId: '4',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '5',
        type :  EnumTypePub['offer'],
        offerId: '5',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '6',
        type :  EnumTypePub['story'],
        storyId : '3',
        title:"pub6",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '7',
        type :  EnumTypePub['event'],
        eventId : '1',
        title:"pub7",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
       
    },
    {
        id : '8',
        type :  EnumTypePub['event'],
        eventId : '2',
        title:"pub8",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '9',
        type :  EnumTypePub['offer'],
        eventId : '3',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '10',
        type :  EnumTypePub['event'],
        eventId : '4',
        title:"pub10",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '11',
        type :  EnumTypePub['video'],
        videoId : '1',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '12',
        type :  EnumTypePub['event'],
        title:"pub7",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '13',
        type :  EnumTypePub['video'],
        videoId : '2',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '14',
        type :  EnumTypePub['video'],
        videoId : '3',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
       
    },
    {
        id : '15',
        type :  EnumTypePub['post'],
        postId : '1',
        title:"Les Meilleures Ecoles De Dev",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '16',
        type :  EnumTypePub['post'],
        postId : '2',
        title:"pub12",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '17',
        type :  EnumTypePub['post'],
        postId : '3',
        title:"pub13",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '18',
        type :  EnumTypePub['post'],
        postId : '4',
        title:"pub14",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '19',
        type :  EnumTypePub['post'],
        postId : '5',
        title:"pub15",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '20',
        type :  EnumTypePub['story'],
        storyId : '4',
        title:"pub16",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '21',
        type :  EnumTypePub['story'],
        storyId : '5',
        title:"pub17",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '22',
        type :  EnumTypePub['story'],
        storyId : '6',
        title:"pub18",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    }
    ,
    {
        id : '23',
        type :  EnumTypePub['event'],
        eventId : '5',
        title:"pub19",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '24',
        type :  EnumTypePub['event'],
        eventId : '6',
        title:"pub20",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '25',
        type :  EnumTypePub['post'],
        postId : '6',
        title:"pub15",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "commercial@gmail.com" },
          }
    },
    {
        id : '26',
        type : EnumTypePub["story"],
        storyId : '7',
        title:"pub1",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
       
    },
    {
        id : '27',
        type :  EnumTypePub['story'],
        storyId : '8',
        title:"pub1",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '28',
        type :  EnumTypePub['offer'],
        offerId: '7',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '29',
        type :  EnumTypePub['offer'],
        offerId: '8',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '30',
        type :  EnumTypePub['offer'],
        offerId: '9',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '31',
        type :  EnumTypePub['story'],
        storyId : '9',
        title:"pub6",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '32',
        type :  EnumTypePub['event'],
        eventId : '7',
        title:"pub7",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
       
    },
    {
        id : '33',
        type :  EnumTypePub['event'],
        eventId : '8',
        title:"pub8",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '34',
        type :  EnumTypePub['offer'],
        eventId : '9',
        title:"Directeur d'Agence",
        description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '35',
        type :  EnumTypePub['event'],
        eventId : '10',
        title:"pub10",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '36',
        type :  EnumTypePub['video'],
        videoId : '4',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '37',
        type :  EnumTypePub['event'],
        title:"pub7",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '38',
        type :  EnumTypePub['video'],
        videoId : '5',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '39',
        type :  EnumTypePub['video'],
        videoId : '6',
        title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
       
    },
    {
        id : '40',
        type :  EnumTypePub['post'],
        postId : '7',
        title:"Les Meilleures Ecoles De Dev",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '41',
        type :  EnumTypePub['post'],
        postId : '8',
        title:"pub12",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '42',
        type :  EnumTypePub['post'],
        postId : '9',
        title:"pub13",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '43',
        type :  EnumTypePub['post'],
        postId : '10',
        title:"pub14",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '44',
        type :  EnumTypePub['post'],
        postId : '11',
        title:"pub15",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '45',
        type :  EnumTypePub['story'],
        storyId : '10',
        title:"pub16",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '46',
        type :  EnumTypePub['story'],
        storyId : '11',
        title:"pub17",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '47',
        type :  EnumTypePub['story'],
        storyId : '12',
        title:"pub18",
        description :"Internship in ABCD #Job #hiring Lorem ipsum...",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    }
    ,
    {
        id : '48',
        type :  EnumTypePub['event'],
        eventId : '11',
        title:"pub19",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '49',
        type :  EnumTypePub['event'],
        eventId : '12',
        title:"pub20",
        description :"Eleifend eget eros integer etiam ",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
        id : '50',
        type :  EnumTypePub['post'],
        postId : '12',
        title:"pub15",
        description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus....",
        user: {
            connect: { username: "recruiter@gmail.com" },
          }
    },
    {
      id : '51',
      type :  EnumTypePub['offer'],
      title:"Directeur d'Agence",
      description :"consectetur adipiscing dolor sit amet, consectetur adipiscing",
      user: {
          connect: { username: "recruiter@gmail.com" },
        }
  },

  {
    id : '52',
    type :  EnumTypePub['video'],
    videoId : '7',
    title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
    description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
    user: {
        connect: { username: "recruiter@gmail.com" },
      }
},    
{
  id : '53',
  type :  EnumTypePub['video'],
  videoId : '8',
  title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  user: {
      connect: { username: "recruiter@gmail.com" },
    }
},    
{
  id : '54',
  type :  EnumTypePub['video'],
  videoId : '9',
  title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  user: {
      connect: { username: "recruiter@gmail.com" },
    }
},
{
  id : '55',
  type :  EnumTypePub['video'],
  videoId : '10',
  title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  description :"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec est est, mattis dignissim ac mattis. Elementum vitae nec donec senectus tempo....",
  user: {
      connect: { username: "recruiter@gmail.com" },
    }
},
]

     export async function addPublicationsSeedData() {
      for (let i = 0; i < publications.length; i++) {
      await prisma.publication.upsert({
        where: {
            id: publications[i].id,
        },
        update:  
            publications[i]
         ,
        create:  publications[i] ,
      })
      
      }
    }

