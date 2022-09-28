import { Users } from "./Data/Users";
import { PrismaClient } from "@prisma/client";
import { addContractSeedData } from "./Data/Contract";
import { addJobSeedData } from "./Data/Job";
import { addCommunitiesSeedData } from "./Data/Community";
import { addCountriesSeedData } from "./Data/City";
import { addLanguagesSeedData } from "./Data/Language";
import { addPublicationsSeedData } from "./Data/Publications";
import axios from "axios";
import { addOffersSeedData } from "./Data/Offer";
import { BadRequestException } from "@nestjs/common";
import { addCandidatesSeedData } from "./Data/Candidate";
import { addRecruitersSeedData } from "./Data/Recruiter";
import { addStorySeedData } from "./Data/Story";
import { addVideoSeedData } from "./Data/Video";
import { addEventSeedData } from "./Data/Event";
import { addEntrepriseSeedData } from "./Data/Entreprise";
import { addSocialInterractionSeedData } from "./Data/Socialinterraction";
import { addCategoriesSeedData } from "./Data/Categories";
import { addFeedbacksSeedData } from "./Data/Feedback";
import { addPostsSeedData } from "./Data/Post";
import { addAudiencesSeedData } from "./Data/Audiences";

import { addUserInteractions } from "./Data/UserInteractions";
const prisma = new PrismaClient();

async function seed() {
  const queryEnableRowSecurity =
    'alter table public."User" enable row level security';
  await prisma.$queryRawUnsafe(queryEnableRowSecurity);
  // await prisma.$queryRawUnsafe('alter table public."User" enable row level security');

  const queryPolicyInsertUser =
    "DO " +
    "$do$ " +
    "BEGIN " +
    "IF NOT EXISTS ( " +
    "SELECT FROM pg_catalog.pg_policies " +
    "WHERE  policyname = 'Users can insert their own users.') THEN " +
    'create policy "Users can insert their own users." on public."User" for insert ;' +
    "END IF; " +
    "END; " +
    "$do$; ";
  await prisma.$queryRawUnsafe(queryPolicyInsertUser);

  const { DEPLOYMENT_MODE } = process.env;
  console.log(
    "##########################################################Production mode !!"
  );
  await addContractSeedData();
  await addJobSeedData();
  await addCommunitiesSeedData();
  await addCountriesSeedData()
  await addLanguagesSeedData();
  await addEntrepriseSeedData();
  // if(DEPLOYMENT_MODE!=="develop"){

  //     console.log("Production mode !!")
  //         process.exit(1);
  // }

  for (let i = 0; i < Users.length; i++) {
    const authUsers =
      "SELECT instance_id, id, aud, role, email FROM auth.users ;";
    let users: any;
    users = await prisma.$queryRawUnsafe(authUsers);
    if (users && users[i]) {
      console.log("users:", users[i].email);
      console.log("USER :", Users[i].email);
      console.log(users[i]?.email == Users[i]?.email);
    }
    const user = await prisma.user.findUnique({ where: { username: Users[i].email } });


    console.log((process.env.KONG_URL || "") + "/auth/v1/admin/users");
    console.log(user?.email !== Users[i].email &&
      users[i]?.email !== Users[i]?.email)
    if (
      user?.email !== Users[i].email &&
      users[i]?.email !== Users[i]?.email

    ) {
      
      await axios
        .post(
          (process.env.KONG_URL || "") + "/auth/v1/admin/users",
          {
            ...Users[i], email_confirm: true, role: Users[i].roles
          },
          {
            headers: {
              "Content-Type": "application/json",
              apikey: process.env.ANON_KEY || "",
              Authorization: `Bearer ${process.env.SERVICE_ROLE_KEY || ""}`,
            },
          }
        )
        .then(async (response) => {
          const createUser = await prisma.user.update({
            where: {
              id: response.data.id,
            },
            data: {
              firstName: Users[i].firstName,
              lastName: Users[i].lastName,
              username: Users[i].username,
              roles: Users[i].roles,
              email: Users[i].email,
              phone: Users[i].phone,
              address: Users[i].address,
              candidateId: Users[i].candidateId,
              recruiterId: Users[i].recruiterId,
              usersOnCommunities: {
                create: {
                  community: {
                    connect: { name: "PUBLICITÉ - MARKETING- COMMUNICATION" }

                  }
                }
              }
            },
          });
          return response.data;
        })

        .catch((error) => {
          throw new BadRequestException(error.response);
        });

        console.log("update data")

     
    }else {
      await prisma.user.update({
        data: {
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          usersOnCommunities: {
            create: {
              community: {
                connect: { name: "PUBLICITÉ - MARKETING- COMMUNICATION" }
  
              }
            }
          },
        },
  
        where: { username: Users[i].username }
      })
    }
    

  }

  await addCandidatesSeedData();
  await addPublicationsSeedData();
  await addCategoriesSeedData();
  await addVideoSeedData();
  await addOffersSeedData();
  await addStorySeedData();
  await addEventSeedData();
  await addSocialInterractionSeedData();
  await addPostsSeedData();
  await addFeedbacksSeedData();
  await addRecruitersSeedData();
  await addAudiencesSeedData();
  await addUserInteractions();

}

seed()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    console.log("success");
    prisma.$disconnect();
  });
