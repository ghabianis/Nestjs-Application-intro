
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Communities = [
    {"name":"ADMINISTRATIF -SECRETARIAT-ASSISTANAT"},
    {"name":"AÉRONAUTIQUE"}
    ,
    {"name":"AGROALIMENTAIRE"},
    {"name":"ARCHITECTE -CONSTRUCTION -URBANISME"},
    {"name":"ASSURANCE"},
    {"name":"AUTOMOBILE"},
    {"name":"BTP"},
    {"name":"BANQUE - FINANCE"},
    {"name":"CHIMIE - BIOLOGIE"},
    {"name":"COMMERCE - VENTE"},
    {"name":"COMMUNICATION"},
    {"name":"COMPTABILITÉ - GESTION"}
    ,
    {"name":"DISTRIBUTION"},
    {"name":"DROIT - JURIDIQUE"},
    {"name":"ENERGIE"},
    {"name":"ENSEIGNEMENT"},
    {"name":"ENVIRONNEMENT-DEVELOPPEMENT-DURABLE"},
    {"name":"ESTHÉTIQUE - BEAUTÉ - COIFFURE"}
    ,
    {"name":"ÉVÉNEMENTIEL"}
    ,
    {"name":"FONCTION PUBLIQUE / MANAGEMENT PUBLIC"},
    {"name":"HÔTELLERIE-RESTAURATION"}
    ,
    {"name":"IMMOBILIER"},
    {"name":"INDUSTRIE"},
    {"name":"INFORMATIQUE - ELECTRONIQUE - NUMÉRIQUE"}
    ,
    {"name":"INTERNET - ECOMERCE"},
    {"name":"LOGISTIQUE"},
    {"name":"MAINTENANCE"},
    {"name":"MARKETING COMMUNICATION"},
    {"name":"MODE - TEXTILE"},
    {"name":"ORGANISATION-QUALITE-METHODE"},
    {"name":"PARAMÉDICAL"}
    ,
    {"name":"PUBLICITÉ - MARKETING- COMMUNICATION"}
    ,
    {"name":"RESSOURCES HUMAINES"},
    {"name":"SANTÉ"}
    ,
    {"name":"SÉCURITÉ - ARMÉE - DÉFENSE"}
    ,
    {"name":"SOCIAL- SERVICE A LA PERSONNE"},
    {"name":"TELECOM"},
    {"name":"TOURISME"},
    {"name":"TRANSPORT-"}
    ]

    export async function addCommunitiesSeedData() {
        for (let i = 0; i < Communities.length; i++) {
          await prisma.community.upsert({
            where: {
                name: Communities[i].name,
            },
            update:  { name : Communities[i].name  },
            create:  Communities[i],
          })
          
          }
      
      }   