import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Candidats = [
  {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    activityField: "Activity1",
    wantedPost: "Post",
    experiencesYears: 3,
    languages: "english",
    tags: "tags1",
    maxSalary: 3000.0,
    minSalary: 900.0,
    personalCv: "Cv",
    mediaLink: "https://mediaLink",
  },
  {
    id: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
    activityField: "Activity2",
    wantedPost: "Post",
    experiencesYears: 3,
    languages: "francais",
    tags: "tags2",
    maxSalary: 3000.0,
    minSalary: 900.0,
    personalCv: "Cv",
    mediaLink: "https://mediaLink",
  },
];

export async function addCandidatesSeedData() {
  const users = await prisma.user.findMany({
    where: { OR: [ { email: "candidate6@gmail.com" } , { email: "candidats7@gmail.com" } ]},orderBy:{createdAt:'asc'}
    },
  );
  console.log(users,' userrrrssss ')
  const jobs = await prisma.job.findMany({
    take:3
    },
  );

  for (let i = 0; i < Candidats.length; i++) {
    await prisma.candidate.upsert({
      where: {
        id: Candidats[i].id,
      },
      update: {
        //userId: users[i].id
      },
      create: {
                ...Candidats[i],
                userId: users[i].id,
                jobId:jobs[Math.floor(Math.random() * 2)].id,
              },
    });
  }

}
