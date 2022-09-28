import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const contracts = [
  {
    id: "cl611od4s00007po5ejngszu5",
    name: "CDD",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cl611od4w00077po51wix9pa3",
    name: "Freelance",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cl611od4z00147po54j58w96o",
    name: "CDI",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "cl611od4z00147po54j58w965",
    name: "Alternance",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function addContractSeedData() {
  for (let i = 0; i < contracts.length; i++) {
    await prisma.contract.upsert({
      where: {
        id: contracts[i].id,
      },
      update:  { name : contracts[i].name , updatedAt  : contracts[i].updatedAt  },
      create:  contracts[i],
    })
    
    }

}
