import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const Recruiter = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    entrepriseId: "1",
    username: "recruiter@gmail.com",
},
{
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    entrepriseId: "1",
    username: "recruiter2@gmail.com",
}, 
{
    id: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
    entrepriseId: "2",
    username: "commercial@gmail.com",
},
];

export async function addRecruitersSeedData() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { email: "recruiter2@gmail.com" },
        { email: "recruiter@gmail.com" },
        { email: "commercial@gmail.com" },
      ],
    },
  });

  for (let i = 0; i < Recruiter.length; i++) {
    console.log(Recruiter[i]);
    await prisma.recruiter.upsert({
      where: {
        id: Recruiter[i].id,
      },
      update: {
        entreprise: {
          connect: {
            id: Recruiter[i].entrepriseId,
          },
        },
      },
      create: {
        id: Recruiter[i].id,
        user: {
          connect: { username: Recruiter[i].username },
        },
        entreprise: {
          connect: {
            id: Recruiter[i].entrepriseId,
          },
        },
      },
    });
  }
}
