import { Injectable } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { FollowEntrepriseServiceBase } from "./base/followEntreprise.service.base";
import { audienceList, statesBoardTableView } from "@prisma/client";
import { EntrepriseFollowInterface } from "src/util/EntrepriseFollowInterface";
import { UserInterface } from "src/util/UserInterface";

@Injectable()
export class FollowEntrepriseService extends FollowEntrepriseServiceBase {
  constructor(protected readonly prisma: DbService) {
    super(prisma);
  }


  //function get list of candidates inroled in specifique offer with status 
  async statesBoardTableView(args: any):Promise<EntrepriseFollowInterface<statesBoardTableView>>  {
    const [data] = await Promise.all([
      this.prisma.statesBoardTableView.findMany(args),
    ]);
    return {
      stats : data,
    };
  }

  async user_list(args: any): Promise<UserInterface<audienceList>> {
    const [data] = await Promise.all([
      this.prisma.audienceList.findMany(args),
    ]);
    return {
      topusers : data
    };
  }
}
