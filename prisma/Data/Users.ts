import  { Candidats } from './Candidate'
import { Recruiter } from './Recruiter'

export const Users = [
    {
        firstName : 'admin 1' ,
        lastName  : 'admin 1' ,
        username  : 'admin@gmail.com'  ,
        password  : '123496787' ,
        roles     : 'admin' ,
        email     : 'admin@gmail.com' ,
        phone     : '+21650465443' ,
        address   : 'route ...' ,
        candidateId : null ,
        recruiterId :null ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'

     
    },
    {
        firstName : 'admin 2' ,
        lastName  : 'admin 2' ,
        username  : 'admin2@gmail.com'  ,
        password  : '123496787' ,
        roles     : 'admin' ,
        email     : 'admin2@gmail.com' ,
        phone     : '+21650465444' ,
        address   : 'route ...' ,
        candidateId : null ,
        recruiterId :null ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'

     
    },
    {
        firstName : 'candidate 1' ,
        lastName  : 'candidate 1' ,
        username  : 'candidate6@gmail.com'  ,
        password  : '123496787' ,
        roles     : 'candidate_role' ,
        email     : 'candidate6@gmail.com' ,
        phone     : '+21650465445' ,
        address   : 'route ...' ,
        candidateId : Candidats[0].id ,
        recruiterId :null ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'

     
    },
    {
        firstName : 'Candidats 2' ,
        lastName  : 'Candidats 2' ,
        username  : 'candidats7@gmail.com'  ,
        password  : '123456787' ,
        roles     : 'candidate_role' ,
        email     : 'candidats7@gmail.com' ,
        phone     : '+21650465292' ,
        address   : 'route ...' ,
        candidateId : Candidats[1].id ,
        recruiterId :null ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'

     
    },
    {
        firstName : 'Recruiter 1' ,
        lastName  : 'Recruiter 1' ,
        username  :'recruiter@gmail.com' ,
        password  : '123456489' ,
        roles     : 'recruiter_role' ,
        email     : 'recruiter@gmail.com' ,
        phone     : '+2165046532' ,
        address   : 'route ...' ,
        candidateId : null ,
        recruiterId :Recruiter[0].id ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'

     
    },
    {
        firstName : 'Recruiter 2' ,
        lastName  : 'Recruiter 2' ,
        username  : 'recruiter2@gmail.com' ,
        password  : '123456189' ,
        roles     : 'recruiter_role' ,
        email     : 'recruiter2@gmail.com' ,
        phone     : '+1650465922' ,
        address   : 'route ...' ,
        candidateId : null ,
        recruiterId :Recruiter[1].id ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
     
    },
    {
        firstName : 'commercial1' ,
        lastName  : 'commercial1' ,
        username  : 'commercial@gmail.com' ,
        password  : 'test123' ,
        roles     : 'recruiter_role' ,
        email     : 'commercial@gmail.com' ,
        phone     : '+16254456112' ,
        address   : 'tunisia' ,
        candidateId : null ,
        recruiterId : Recruiter[2].id ,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
]
