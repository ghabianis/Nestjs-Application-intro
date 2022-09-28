import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import * as nestMorgan from "nest-morgan";
import * as abacUtil from "../auth/abac.util";
import * as errors from "../errors";
import * as nestAccessControl from "nest-access-control";
import { CandidateService } from "./candidate.service";
import { CandidateControllerBase } from "./base/candidate.controller.base";
import { Candidate } from "./base/Candidate";
import { CandidateWhereInput } from "./base/CandidateWhereInput";
import { UserWhereInput } from "src/user/base/UserWhereInput";
import { User } from "src/user/base/User";
import { CandidateCreateInput } from "./base/CandidateCreateInput";
import { UserCreateInput } from "src/user/base/UserCreateInput";
import { plainToClass } from "class-transformer";
import { UserUpdateInput } from "src/user/base/UserUpdateInput";
import { Request } from "express";
import { ContractResolver } from "src/contract/contract.resolver";
import { CandidateUpdateInput } from "./base/CandidateUpdateInput";
import { UserRecruiterJobUpdateInput } from "src/user/UserCandidateJobUpdateInput";
import { RecruiterUpdateInput } from "src/recruiter/base/RecruiterUpdateInput";
import { Recruiter } from "src/recruiter/base/Recruiter";
import { EntrepriseUpdateInput } from "src/entreprise/base/EntrepriseUpdateInput";
import { RecruiterWhereInput } from "src/recruiter/base/RecruiterWhereInput";
import { RecruiterWhereUniqueInput } from "src/recruiter/base/RecruiterWhereUniqueInput";
import { request } from "http";
import { SocialinterractionFindManyArgs } from "src/socialinterraction/base/SocialinterractionFindManyArgs";
import { Entreprise } from "src/entreprise/base/Entreprise";

@swagger.ApiTags("candidates")
@common.Controller("candidates")
export class CandidateController extends CandidateControllerBase {
  constructor(
    protected readonly service: CandidateService,
    private candidateService : CandidateService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
  ) {
    super(service, rolesBuilder);
  }



  @common.Get('language')
  async GetCandidateLanguage(){
  const  resp = await this.candidateService.GetCandidatLanguage({
      select : {
        candidateid : true,
        languageid  : true,
        createdat : true,
        updatedat : true
      }
    });
    return resp;
  }



 
}

