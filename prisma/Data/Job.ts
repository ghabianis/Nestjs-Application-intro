import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const jobs = [
    {"name":"acheteur d’espaces publicitaires"}
    ,
    {"name":"acheteur industriel"}
    ,
    {"name":"actuaire"}
    ,
    {"name":"adjoint administratif"}
    ,
    {"name":"adjoint de direction"}
    ,
    {"name":"adjoint de sécurité (ADS)"}
    ,
    {"name":"administrateur civil"}
    ,
    {"name":"administrateur de base de données"}
    ,
    {"name":"administrateur de biens"}
    ,
    {"name":"administrateur des ventes"}
    ,
    {"name":"administrateur judiciaire"}
    ,
    {"name":"Administrateur systèmes et réseaux"}
    ,
    {"name":"agent administratif"}
    ,
    {"name":"affréteur"}
    ,
    {"name":"agent commercial"}
    ,
    {"name":"agent d’accueil"}
    ,
    {"name":"agent d'entretien"}
    ,
    {"name":"agent d’entretien des espaces verts"}
    ,
    {"name":"agent d’escale"}
    ,
    {"name":"agent d’exploitation"}
    ,
    {"name":"agent de location"}
    ,
    {"name":"agent de maintenance"}
    ,
    {"name":"agent de maintenance industrielle"}
    ,
    {"name":"agent de manutention"}
    ,
    {"name":"agent de prévention et de sécurité"}
    ,
    {"name":"agent de recouvrement"}
    ,
    {"name":"agent de transit"}
    ,
    {"name":"agent de voyages"}
    ,
    {"name":"agent général d’assurances"}
    ,
    {"name":"agent immobilier"}
    ,
    {"name":"agent territorial spécialisé des écoles maternelles (ATSEM)"}
    ,
    {"name":"agent territorial spécialisé des écoles maternelles (atsem)"}
    ,
    {"name":"aide médico-psychologique"}
    ,
    {"name":"aide-soignant"}
    ,
    {"name":"ajusteur-monteur"}
    ,
    {"name":"ambulancier"}
    ,
    {"name":"aménageur lotisseur"}
    ,
    {"name":"analyste financier"}
    ,
    {"name":"analyste fonctionnel"}
    ,
    {"name":"analyste gouvernance"}
    ,
    {"name":"analyste juridique"}
    ,
    {"name":"animateur"}
    ,
    {"name":"animateur des ventes"}
    ,
    {"name":"animateur du patrimoine"}
    ,
    {"name":"animateur logistique"}
    ,
    {"name":"architecte"}
    ,
    {"name":"Architecte Big Data"}
    ,
    {"name":"architecte d’intérieur"}
    ,
    {"name":"Architecte de réseaux"}
    ,
    {"name":"architecte web"}
    ,
    {"name":"archiviste"}
    ,
    {"name":"asset manager"}
    ,
    {"name":"assistant chef de chantier"}
    ,
    {"name":"assistant chef de projet"}
    ,
    {"name":"assistant commercial"}
    ,
    {"name":"assistant d’éducation"}
    ,
    {"name":"assistant de communication"}
    ,
    {"name":"assistant de direction"}
    ,
    {"name":"assistant de gestion PME-PMI"}
    ,
    {"name":"assistant de justice"}
    ,
    {"name":"assistant ressources humaines"}
    ,
    {"name":"assistant de service social"}
    ,
    {"name":"assistant dentaire"}
    ,
    {"name":"assistant recrutement"}
    ,
    {"name":"assistant juridique"}
    ,
    {"name":"assistant marketing"}
    ,
    {"name":"assistant-comptable"}
    ,
    {"name":"assistante maternelle"}
    ,
    {"name":"audioprothésiste"}
    ,
    {"name":"auditeur externe"}
    ,
    {"name":"auditeur interne"}
    ,
    {"name":"auditeur social"}
    ,
    {"name":"auxiliaire de puériculture"}
    ,
    {"name":"auxiliaire de vie"}
    ,
    {"name":"avocat"}
    ,
    {"name":"avocat d’affaires"}
    ,
    {"name":"avocat pénaliste"}
    ,
    {"name":"baby sitter"}
    ,
    {"name":"bibliothécaire"}
    ,
    {"name":"biochimiste"}
    ,
    {"name":"biologiste"}
    ,
    {"name":"biologiste médical"}
    ,
    {"name":"boucher"}
    ,
    {"name":"boulanger"}
    ,
    {"name":"business analyst"}
    ,
    {"name":"business developer"}
    ,
    {"name":"caissier.e"}
    ,
    {"name":"campus-manager"}
    ,
    {"name":"cardiologue"}
    ,
    {"name":"carreleur"}
    ,
    {"name":"carrossier réparateur"}
    ,
    {"name":"carrossier-peintre"}
    ,
    {"name":"caviste"}
    ,
    {"name":"charcutier-traiteur"}
    ,
    {"name":"chargé d’accueil"}
    ,
    {"name":"chargé d’affaires"}
    ,
    {"name":"chargé d’affaires en génie thermique et climatique"}
    ,
    {"name":"chargé d’assistance"}
    ,
    {"name":"chargé d’études"}
    ,
    {"name":"chargé d’études commerciales"}
    ,
    {"name":"chargé d’études documentaires"}
    ,
    {"name":"chargé d’études en environnement ou écologue"}
    ,
    {"name":"chargé d’études marketing"}
    ,
    {"name":"chargé d’indemnisation"}
    ,
    {"name":"chargé de bilan de compétences"}
    ,
    {"name":"chargé de clientèle"}
    ,
    {"name":"chargé de clientèle de particuliers"}
    ,
    {"name":"chargé de clientèle de professionnels"}
    ,
    {"name":"chargé de communication"}
    ,
    {"name":"chargé de communication en collectivité"}
    ,
    {"name":"chargé de conformité"}
    ,
    {"name":"chargé de formation"}
    ,
    {"name":"chargé de gestion en ressources humaines"}
    ,
    {"name":"chargé de gestion technique des bâtiments industriels et tertiaires"}
    ,
    {"name":"chargé de l’administration des ventes"}
    ,
    {"name":"chargé de mission"}
    ,
    {"name":"chargé de mission diversité et handicap"}
    ,
    {"name":"chargé de mission en énergies renouvelables"}
    ,
    {"name":"chargé de mission environnement"}
    ,
    {"name":"chargé de programmation"}
    ,
    {"name":"chargé de projets événementiel"}
    ,
    {"name":"chargé de recouvrement"}
    ,
    {"name":"chargé de recrutement"}
    ,
    {"name":"Chargé des méthodes outils et qualité"}
    ,
    {"name":"chargé du développement"}
    ,
    {"name":"chargé du développement économique"}
    ,
    {"name":"charpentier bois"}
    ,
    {"name":"chasseur de tête"}
    ,
    {"name":"chaudronnier et tuyauteur"}
    ,
    {"name":"chauffagiste"}
    ,
    {"name":"chauffeur-livreur"}
    ,
    {"name":"chef cuisinier ou chef de production en restauration collective"}
    ,
    {"name":"chef d’équipe en restauration rapide"}
    ,
    {"name":"chef d’escale"}
    ,
    {"name":"chef d’exploitation"}
    ,
    {"name":"chef d’exploitation d’une usine d’incinération"}
    ,
    {"name":"chef de caisse"}
    ,
    {"name":"chef de chantier"}
    ,
    {"name":"chef de chantier en génie climatique et sanitaire"}
    ,
    {"name":"chef de cuisine"}
    ,
    {"name":"chef de fabrication"}
    ,
    {"name":"chef de gare"}
    ,
    {"name":"chef de groupe"}
    ,
    {"name":"chef de marché"}
    ,
    {"name":"chef de partie"}
    ,
    {"name":"chef de produit"}
    ,
    {"name":"chef de produit industriel"}
    ,
    {"name":"Chef de produit jeu vidéo"}
    ,
    {"name":"chef de produit Web"}
    ,
    {"name":"chef de projet"}
    ,
    {"name":"chef de projet digital"}
    ,
    {"name":"chef de projet e-business"}
    ,
    {"name":"chef de projet e-CRM"}
    ,
    {"name":"chef de projet événementiel"}
    ,
    {"name":"Chef de projet informatique"}
    ,
    {"name":"chef de projet innovation et transformation"}
    ,
    {"name":"Chef de projet MOA"}
    ,
    {"name":"Chef de projet MOE"}
    ,
    {"name":"chef de projet web"}
    ,
    {"name":"chef de rang"}
    ,
    {"name":"chef de rayon"}
    ,
    {"name":"chef de rubrique"}
    ,
    {"name":"chimiste"}
    ,
    {"name":"chimiste dans l’industrie pharmaceutique"}
    ,
    {"name":"clerc d’huissier"}
    ,
    {"name":"clerc de notaire"}
    ,
    {"name":"coffreur-boiseur"}
    ,
    {"name":"coiffeur"}
    ,
    {"name":"commercial"}
    ,
    {"name":"commercial en informatique"}
    ,
    {"name":"commercial télécoms"}
    ,
    {"name":"commis de cuisine"}
    ,
    {"name":"commissaire aux comptes"}
    ,
    {"name":"community manager"}
    ,
    {"name":"comptable"}
    ,
    {"name":"comptable immobilier"}
    ,
    {"name":"concepteur web"}
    ,
    {"name":"concepteur-rédacteur"}
    ,
    {"name":"concierge"}
    ,
    {"name":"conducteur d’appareil dans les industries chimiques"}
    ,
    {"name":"conducteur d’autocar"}
    ,
    {"name":"conducteur d’engins de travaux publics"}
    ,
    {"name":"conducteur de bus"}
    ,
    {"name":"conducteur de grue"}
    ,
    {"name":"conducteur de ligne de fabrication et de conditionnement"}
    ,
    {"name":"conducteur de train"}
    ,
    {"name":"conducteur de travaux"}
    ,
    {"name":"conducteur routier"}
    ,
    {"name":"conseiller de vente"}
    ,
    {"name":"conseiller en assurances"}
    ,
    {"name":"conseiller en insertion sociale et professionnelle"}
    ,
    {"name":"conseiller principal d’éducation"}
    ,
    {"name":"consolideur"}
    ,
    {"name":"consultant e-business/e-commerce"}
    ,
    {"name":"consultant en recrutement"}
    ,
    {"name":"Consultant IT"}
    ,
    {"name":"consultant prologiciel"}
    ,
    {"name":"consultant SAAS (cloud computing)"}
    ,
    {"name":"Consultant spécialisé en sécurité des réseaux et systèmes"}
    ,
    {"name":"Consultant technique"}
    ,
    {"name":"consultant web analytic"}
    ,
    {"name":"content manager"}
    ,
    {"name":"contrôleur de gestion"}
    ,
    {"name":"contrôleur qualité"}
    ,
    {"name":"contrôleur sinistres"}
    ,
    {"name":"contrôleur technique"}
    ,
    {"name":"convoyeur de fonds"}
    ,
    {"name":"coordinateur de production"}
    ,
    {"name":"couvreur"}
    ,
    {"name":"credit manager"}
    ,
    {"name":"Data analyst"}
    ,
    {"name":"Data scientist"}
    ,
    {"name":"délégué pharmaceutique"}
    ,
    {"name":"déménageur"}
    ,
    {"name":"designer"}
    ,
    {"name":"designer graphiste"}
    ,
    {"name":"designer industriel"}
    ,
    {"name":"dessinateur"}
    ,
    {"name":"dessinateur industriel"}
    ,
    {"name":"Développeur"}
    ,
    {"name":"développeur base de données"}
    ,
    {"name":"développeur web"}
    ,
    {"name":"diagnostiqueur immobilier"}
    ,
    {"name":"directeur administratif et financier"}
    ,
    {"name":"directeur artistique"}
    ,
    {"name":"directeur artistique web"}
    ,
    {"name":"directeur commercial"}
    ,
    {"name":"directeur commercial et marketing"}
    ,
    {"name":"directeur d’agence"}
    ,
    {"name":"directeur d’agence de gestion"}
    ,
    {"name":"directeur d’agence évènementielle"}
    ,
    {"name":"directeur d’école"}
    ,
    {"name":"directeur d’études"}
    ,
    {"name":"directeur d’exploitation"}
    ,
    {"name":"directeur d’hébergement"}
    ,
    {"name":"directeur d’hôpital"}
    ,
    {"name":"directeur d’hôtel"}
    ,
    {"name":"directeur de boutique"}
    ,
    {"name":"directeur de clientèle"}
    ,
    {"name":"directeur de communication"}
    ,
    {"name":"directeur marketing"}
    ,
    {"name":"directeur de la restauration"}
    ,
    {"name":"directeur de magasin de sport"}
    ,
    {"name":"directeur des achats"}
    ,
    {"name":"directeur des opérations"}
    ,
    {"name":"directeur des programmes immobiliers"}
    ,
    {"name":"directeur des ressources humaines"}
    ,
    {"name":"Directeur du service informatique"}
    ,
    {"name":"directeur financier"}
    ,
    {"name":"directeur marketing"}
    ,
    {"name":"directeur régional des ventes"}
    ,
    {"name":"directeur technique"}
    ,
    {"name":"échafaudeur"}
    ,
    {"name":"éducateur spécialisé"}
    ,
    {"name":"éducateur sportif"}
    ,
    {"name":"éducateur technique spécialisé"}
    ,
    {"name":"élagueur"}
    ,
    {"name":"électricien"}
    ,
    {"name":"électricien d’équipement"}
    ,
    {"name":"électronicien automobile"}
    ,
    {"name":"électrotechnicien"}
    ,
    {"name":"employé libre-service"}
    ,
    {"name":"enseignant"}
    ,
    {"name":"équipier en restaurant rapide"}
    ,
    {"name":"esthéticienne"}
    ,
    {"name":"expert comptable"}
    ,
    {"name":"Expert en sécurité informatique"}
    ,
    {"name":"facility manager"}
    ,
    {"name":"formateur"}
    ,
    {"name":"gardien d’immeuble"}
    ,
    {"name":"géomètre topographe"}
    ,
    {"name":"gestion de patrimoine"}
    ,
    {"name":"gestionnaire d’actifs"}
    ,
    {"name":"gestionnaire de biens immobiliers"}
    ,
    {"name":"gestionnaire de carrière"}
    ,
    {"name":"Gestionnaire de contrats"}
    ,
    {"name":"gestionnaire de copropriété"}
    ,
    {"name":"gestionnaire de paie"}
    ,
    {"name":"gestionnaire des stocks"}
    ,
    {"name":"gestionnaire locatif"}
    ,
    {"name":"graphiste"}
    ,
    {"name":"hotliner (relations clients)"}
    ,
    {"name":"huissier de justice"}
    ,
    {"name":"infirmier scolaire"}
    ,
    {"name":"infirmier(e)"}
    ,
    {"name":"infirmier(e) de bloc opératoire"}
    ,
    {"name":"infirmier(e)-anesthésiste"}
    ,
    {"name":"infographiste"}
    ,
    {"name":"Ingénieur Big data"}
    ,
    {"name":"ingénieur biomécanique"}
    ,
    {"name":"ingénieur biomédical"}
    ,
    {"name":"ingénieur calcul"}
    ,
    {"name":"Ingénieur cloud computing"}
    ,
    {"name":"ingénieur cogniticien ou spécialisé en intelligence artificielle"}
    ,
    {"name":"ingénieur commercial"}
    ,
    {"name":"ingénieur d’affaires"}
    ,
    {"name":"ingénieur d’étude"}
    ,
    {"name":"ingénieur de fabrication"}
    ,
    {"name":"ingénieur travaux"}
    ,
    {"name":"ingénieur qualité"}
    ,
    {"name":"ingénieur du BTP"}
    ,
    {"name":"ingénieur électricien"}
    ,
    {"name":"ingénieur électrotechnicien"}
    ,
    {"name":"ingénieur en aéronautique"}
    ,
    {"name":"ingénieur en dépollution"}
    ,
    {"name":"ingénieur en énergies renouvelables"}
    ,
    {"name":"ingénieur en génie thermique"}
    ,
    {"name":"Ingénieur en gestion des risques"}
    ,
    {"name":"Ingénieur en informatique industrielle"}
    ,
    {"name":"Ingénieur en intelligence artificielle"}
    ,
    {"name":"ingénieur en maintenance des véhicules"}
    ,
    {"name":"ingénieur en mécanique"}
    ,
    {"name":"ingénieur en systèmes embarqués"}
    ,
    {"name":"ingénieur en traitement des déchets"}
    ,
    {"name":"ingénieur environnement/ingénieur écologue"}
    ,
    {"name":"ingénieur études énergies renouvelables et efficacité énergétique"}
    ,
    {"name":"ingénieur génie industriel"}
    ,
    {"name":"Ingénieur informaticien"}
    ,
    {"name":"ingénieur technico-commercial"}
    ,
    {"name":"installateur mainteneur en systèmes solaires thermiques et photovoltaïques"}
    ,
    {"name":"jardinier paysagiste"}
    ,
    {"name":"juriste d’entreprise"}
    ,
    {"name":"Juriste dans les assurances"}
    ,
    {"name":"juriste du sport"}
    ,
    {"name":"juriste en cybersécurité"}
    ,
    {"name":"juriste en droit de l’environnement"}
    ,
    {"name":"juriste en droit de l’immobilier"}
    ,
    {"name":"juriste en propriété intellectuelle"}
    ,
    {"name":"juriste en droit social"}
    ,
    {"name":"Juriste spécialisé en propriété industrielle"}
    ,
    {"name":"manutentionnaire"}
    ,
    {"name":"manager dans la restauration"}
    ,
    {"name":"mécanicien d’engins de travaux publics"}
    ,
    {"name":"mécanicien"}
    ,
    {"name":"mécanicien sur machines tournantes"}
    ,
    {"name":"monteur"}
    ,
    {"name":"monteur en installations thermiques et climatiques"}
    ,
    {"name":"monteur en isolation thermique (calorifugeur)"}
    ,
    {"name":"monteur en optique-lunetterie"}
    ,
    {"name":"monteur-câbleur"}
    ,
    {"name":"motion designer"}
    ,
    {"name":"négociateur immobilier"}
    ,
    {"name":"office manager"}
    ,
    {"name":"opérateur back et middle office"}
    ,
    {"name":"opérateur de fabrication"}
    ,
    {"name":"peintre en bâtiment"}
    ,
    {"name":"peintre en revêtement industriel"}
    ,
    {"name":"préparateur de commande"}
    ,
    {"name":"Product manager"}
    ,
    {"name":"prospecteur foncier"}
    ,
    {"name":"puéricultrice"}
    ,
    {"name":"réceptionniste"}
    ,
    {"name":"rédacteur de contrats"}
    ,
    {"name":"responsable affiliation"}
    ,
    {"name":"responsable commercial"}
    ,
    {"name":"responsable d’agence"}
    ,
    {"name":"responsable d’entrepôt"}
    ,
    {"name":"responsable recrutement"}
    ,
    {"name":"responsable de communication interne"}
    ,
    {"name":"responsable de fabrication"}
    ,
    {"name":"responsable de l’information et de la communication interne"}
    ,
    {"name":"responsable de la communication externe"}
    ,
    {"name":"responsable de la relation client"}
    ,
    {"name":"responsable de logistique"}
    ,
    {"name":"responsable de maintenance"}
    ,
    {"name":"responsable des ressources humaines"}
    ,
    {"name":"responsable des systèmes d’information"}
    ,
    {"name":"responsable développement RH"}
    ,
    {"name":"responsable du financement des projets"}
    ,
    {"name":"responsable e-commerce/m-commerce"}
    ,
    {"name":"responsable formation"}
    ,
    {"name":"responsable géographique"}
    ,
    {"name":"responsable grands comptes/comptes clés"}
    ,
    {"name":"responsable Hygiène Sécurité Environnement (HSE)"}
    ,
    {"name":"responsable logistique"}
    ,
    {"name":"responsable marketing"}
    ,
    {"name":"responsable marketing digital"}
    ,
    {"name":"responsable merchandising"}
    ,
    {"name":"responsable paie"}
    ,
    {"name":"responsable qualité"}
    ,
    {"name":"responsable qualité sécurité environnement"}
    ,
    {"name":"responsable récéption"}
    ,
    {"name":"responsable relations sociales"}
    ,
    {"name":"responsable rémunération et avantages sociaux"}
    ,
    {"name":"responsable RSE"}
    ,
    {"name":"secrétaire"}
    ,
    {"name":"secrétaire administratif"}
    ,
    {"name":"secrétaire médicale"}
    ,
    {"name":"secrétaire-assistant juridique"}
    ,
    {"name":"secrétaire-assistant médical"}
    ,
    {"name":"serveur"}
    ,
    {"name":"soudeur"}
    ,
    {"name":"technicien biologiste"}
    ,
    {"name":"technicien de fabrication"}
    ,
    {"name":"technicien de laboratoire"}
    ,
    {"name":"technicien de maintenance"}
    ,
    {"name":"technicien de maintenance aéronautique"}
    ,
    {"name":"technico-commercial"}
    ,
    {"name":"télévendeur"}
    ,
    {"name":"UI designer"}
    ,
    {"name":"urbaniste"}
    ,
    {"name":"Urbaniste ou Architecte fonctionnel SI"}
    ,
    {"name":"UX designer"}
    ,
    {"name":"visuel merchandiser"}
    ,
    {"name":"webdesigner"}
    
    ]

    export async function addJobSeedData() {
        for (let i = 0; i < jobs.length; i++) {
          await prisma.job.upsert({
            where: {
                name: jobs[i].name,
            },
            update:  { name : jobs[i].name  },
            create:  jobs[i],
          })
          
          }
      
      }   