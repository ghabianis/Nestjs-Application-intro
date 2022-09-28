import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { UsersSkillResolverBase } from "./base/usersSkill.resolver.base";
import { UsersSkill } from "./base/UsersSkill";
import { UsersSkillService } from "./usersSkill.service";

@graphql.Resolver(() => UsersSkill)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class UsersSkillResolver extends UsersSkillResolverBase {
  constructor(
    protected readonly service: UsersSkillService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
