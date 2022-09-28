import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const languages = [
    {
        id :"English",
        name : "English",
        createdAt : new Date(),
        updatedAt: new Date()
    },
    {
        id :"Francais",
        name : "Francais",
        createdAt : new Date(),
        updatedAt: new Date()
    },
]

export async function addLanguagesSeedData() {
    for (let i = 0; i < languages.length; i++) {
      await prisma.language.upsert({
        where: {
            id: languages[i].name,
        },
        update:  {id: languages[i].name, name : languages[i].name  },
        create:  languages[i],
      })
      
      }
  
  }   