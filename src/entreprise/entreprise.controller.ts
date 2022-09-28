import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { EntrepriseService } from "./entreprise.service";
import { EntrepriseControllerBase } from "./base/entreprise.controller.base";
import * as nestMorgan from "nest-morgan";
import * as defaultAuthGuard from "../auth/defaultAuth.guard";
import { PrismaService } from "nestjs-prisma";

@swagger.ApiTags("entreprises")
@common.Controller("entreprises")
export class EntrepriseController extends EntrepriseControllerBase {
  constructor(
    protected readonly service: EntrepriseService,
    private readonly entrepriseService:EntrepriseService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }

  // this API is created to return the enterprises list that had more then 10 likes by a user 
  //each user will have a list of enterprises that he gave them more then 10 likes
  @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
  @common.UseGuards(
    defaultAuthGuard.DefaultAuthGuard,
    nestAccessControl.ACGuard
  )
  @common.Get('entrepriseMoreThen10LikesList/:id')
  @nestAccessControl.UseRoles({
    resource: "Publication",
    action: "read",
    possession: "own",
  })
  async  entrepriseMoreThen10LikesList(
    @common.Param('id') id: string,
  ){
      return this.entrepriseService.enterpriseList(id);
  }
}
