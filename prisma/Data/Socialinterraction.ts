import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { publications } from './Publications'


export const Socialinterraction = [
    {
        id : "1",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "2",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "3",
        type : 'like' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "4",
        type : 'comment' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "5",
        type : 'share' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "6",
        type : 'vue' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "7",

        type : 'vue' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "8",
 
        type : 'like' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "9",
 
        type : 'comment' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "10",
   
        type : 'share' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "11",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "12",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "13",
        type : 'like' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "14",
        type : 'comment' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "15",
        type : 'share' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "16",
        type : 'vue' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "17",

        type : 'vue' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "18",
   
        type : 'like' ,
        publicationId  : publications[2].id ,
        // userId  : Users[0].id
    },
    {
        id : "19",
       
        type : 'comment' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "20",
  
        type : 'share' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "21",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "22",
        type : 'vue' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "23",
        type : 'like' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "24",
        type : 'comment' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "25",
        type : 'share' ,
        publicationId  : publications[0].id ,
        // userId  : Users[0].id
    },
    {
        id : "26",
        type : 'vue' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "27",
        type : 'vue' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "28",
        type : 'like' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "29",
        type : 'comment' ,
        publicationId  : publications[1].id ,
        // userId  : Users[0].id
    },
    {
        id : "30",
        type : 'share' ,
        publicationId  : publications[10].id ,
        // userId  : Users[0].id
    },
    {
        id : "31",
        type : 'vue' ,
        publicationId  : publications[12].id ,
        // userId  : Users[0].id
    },
    {
        id : "32",
        type : 'vue' ,
        publicationId  :publications[12].id,
        // userId  : Users[0].id
    },
    {
        id : "33",
        type : 'like' ,
        publicationId  : publications[13].id ,
        // userId  : Users[0].id
    },
    {
        id : "34",
        type : 'comment' ,
        publicationId  : publications[13].id ,
        // userId  : Users[0].id
    },
    {
        id : "35",
        type : 'share' ,
        publicationId  : publications[13].id ,
        // userId  : Users[0].id
    },
    {
        id : "36",
        type : 'vue' ,
        publicationId  : publications[13].id ,
        // userId  : Users[0].id
    },
    {
        id : "37",
        type : 'vue' ,
        publicationId  :publications[13].id ,
        // userId  : Users[0].id
    },
    {
        id : "38",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
    },
    {
        id : "39",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
    },
    {
        id : "40",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
    },
    {
        id : "41",
        type : 'vue' ,
        publicationId  : publications[7].id ,
        // userId  : Users[0].id
    },
    {
        id : "42",
        type : 'vue' ,
        publicationId  :publications[14].id,
        // userId  : Users[0].id
    },
    {
        id : "43",
        type : 'like' ,
        publicationId  : publications[11].id ,
        // userId  : Users[0].id
    },
    {
        id : "44",
        type : 'comment' ,
        publicationId  : publications[11].id ,
        // userId  : Users[0].id
    },
    {
        id : "45",
        type : 'share' ,
        publicationId  : publications[9].id ,
        // userId  : Users[0].id
    },
    {
        id : "46",
        type : 'vue' ,
        publicationId  : publications[9].id ,
        // userId  : Users[0].id
    },
    {
        id : "47",
        type : 'vue' ,
        publicationId  :publications[7].id ,
        // userId  : Users[0].id
    },
    {
        id : "48",
        type : 'like' ,
        publicationId  : publications[7].id ,
        // userId  : Users[0].id
    },
    {
        id : "49",
        type : 'comment' ,
        publicationId  : publications[6].id ,
        // userId  : Users[0].id
    },
    {
        id : "50",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
    },
    {
        id : "51",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T13:37:05.000Z",
        updatedAt : "2022-02-20T12:50:30.282Z"
    },
    {
        id : "52",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-06-20T13:37:05.000Z",
        updatedAt : "2022-07-20T12:50:30.282Z"
    },
    {
        id : "53",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },
    {
        id : "54",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-04-20T14:01:18.508Z",
        updatedAt : "2022-05-20T14:01:18.508Z"
    },    {
        id : "55",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-03-20T14:01:18.508Z",
        updatedAt : "2022-04-20T14:01:18.508Z"
    },    {
        id : "56",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-02-20T14:01:18.508Z",
        updatedAt : "2022-03-20T14:01:18.508Z"
    },    {
        id : "57",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:01:18.508Z"
    },    {
        id : "58",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-08-20T14:01:18.508Z",
        updatedAt : "2022-09-20T14:01:18.508Z"
    },    {
        id : "59",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-11-20T14:01:18.508Z",
        updatedAt : "2022-12-20T14:01:18.508Z"
    },    {
        id : "60",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-10-20T14:01:18.508Z",
        updatedAt : "2022-11-20T14:01:18.508Z"
    },    {
        id : "61",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },    {
        id : "62",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-07-20T14:01:18.508Z",
        updatedAt : "2022-08-20T14:01:18.508Z"
    },
    {
        id : "63",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-06-20T13:37:05.000Z",
        updatedAt : "2022-07-20T12:50:30.282Z"
    },
    {
        id : "64",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },
    {
        id : "65",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-04-20T14:01:18.508Z",
        updatedAt : "2022-05-20T14:01:18.508Z"
    }, 
    {
        id : "66",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-02-20T14:01:18.508Z",
        updatedAt : "2022-03-20T14:01:18.508Z"
    },    {
        id : "67",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:01:18.508Z"
    },    {
        id : "68",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-08-20T14:01:18.508Z",
        updatedAt : "2022-09-20T14:01:18.508Z"
    },    {
        id : "69",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-11-20T14:01:18.508Z",
        updatedAt : "2022-12-20T14:01:18.508Z"
    },    {
        id : "70",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-10-20T14:01:18.508Z",
        updatedAt : "2022-11-20T14:01:18.508Z"
    },    {
        id : "71",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },    {
        id : "72",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-07-20T14:01:18.508Z",
        updatedAt : "2022-08-20T14:01:18.508Z"
    },
    {
        id : "73",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-06-20T13:37:05.000Z",
        updatedAt : "2022-07-20T12:50:30.282Z"
    },
    {
        id : "74",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },
    {
        id : "75",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-04-20T14:01:18.508Z",
        updatedAt : "2022-05-20T14:01:18.508Z"
    },
    {
        id : "76",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-02-20T14:01:18.508Z",
        updatedAt : "2022-03-20T14:01:18.508Z"
    },    {
        id : "77",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:01:18.508Z"
    },    {
        id : "78",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-08-20T14:01:18.508Z",
        updatedAt : "2022-09-20T14:01:18.508Z"
    },    {
        id : "79",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-11-20T14:01:18.508Z",
        updatedAt : "2022-12-20T14:01:18.508Z"
    },    {
        id : "80",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-10-20T14:01:18.508Z",
        updatedAt : "2022-11-20T14:01:18.508Z"
    },    {
        id : "81",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },    {
        id : "82",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-07-20T14:01:18.508Z",
        updatedAt : "2022-08-20T14:01:18.508Z"
    },
    {
        id : "83",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-06-20T13:37:05.000Z",
        updatedAt : "2022-07-20T12:50:30.282Z"
    },
    {
        id : "84",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-05-20T14:01:18.508Z",
        updatedAt : "2022-06-20T14:01:18.508Z"
    },
    {
        id : "85",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-04-20T14:01:18.508Z",
        updatedAt : "2022-05-20T14:01:18.508Z"
    },    {
        id : "86",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-03-20T14:01:18.508Z",
        updatedAt : "2022-04-20T14:01:18.508Z"
    },
    {
        id : "87",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:01:18.508Z"
    },    {
        id : "88",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-08-20T14:01:18.508Z",
        updatedAt : "2022-09-20T14:01:18.508Z"
    },    {
        id : "89",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-11-20T14:01:18.508Z",
        updatedAt : "2022-12-20T14:01:18.508Z"
    },    {
        id : "90",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2020-10-20T14:01:18.508Z",
        updatedAt : "2020-11-20T14:01:18.508Z"
    },    {
        id : "91",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2021-05-20T14:01:18.508Z",
        updatedAt : "2021-06-20T14:01:18.508Z"
    },    {
        id : "92",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-07-20T14:01:18.508Z",
        updatedAt : "2022-08-20T14:01:18.508Z"
    },
    {
        id : "93",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-06-20T13:37:05.000Z",
        updatedAt : "2022-07-20T12:50:30.282Z"
    },
    {
        id : "94",
        type : 'share' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-02-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:02:18.508Z"
    },
    {
        id : "95",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-04-20T14:01:18.508Z",
        updatedAt : "2022-05-20T14:01:18.508Z"
    },    {
        id : "96",
        type : 'vue' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-03-20T14:01:18.508Z",
        updatedAt : "2022-04-20T14:01:18.508Z"
    },
    {
        id : "97",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-01-20T14:01:18.508Z",
        updatedAt : "2022-02-20T14:01:18.508Z"
    },
    {
        id : "98",
        type : 'like' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-08-20T14:01:18.508Z",
        updatedAt : "2022-09-20T14:01:18.508Z"
    },    {
        id : "99",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2022-11-20T14:01:18.508Z",
        updatedAt : "2022-12-20T14:01:18.508Z"
    },
    {
        id : "100",
        type : 'comment' ,
        publicationId  : publications[14].id ,
        // userId  : Users[0].id
        createdAt : "2020-10-20T14:01:18.508Z",
        updatedAt : "2020-11-20T14:01:18.508Z"
    }
]

export async function addSocialInterractionSeedData() {
    for (let i = 0; i < Socialinterraction.length; i++) {
      await prisma.socialinterraction.upsert({
        where: {
            id: Socialinterraction[i].id,
        },
        update:  {
            type : Socialinterraction[i].type,
            publicationId : Socialinterraction[i].publicationId, 
            createdAt : Socialinterraction[i].createdAt,
            updatedAt : Socialinterraction[i].updatedAt
         },
        create:  Socialinterraction[i],
      })
      
      }
    }