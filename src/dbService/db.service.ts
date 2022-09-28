import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
// @ts-ignore
import { RequestContext } from "nestjs-request-context";

@Injectable()
export class DbService extends PrismaService {
  [x: string]: any;
  prismaClientsLocal = new PrismaService();
  constructor() {
    super();
    this.$use(async (params: any, next: any) => {
      let currentSession = this.getCurrentUser();     
      if (params.runInTransaction) return next(params);
      const modelName: any =
        params.model.charAt(0).toLowerCase() + params.model.slice(1);
        console.log(
          `set "request.jwt.claims" to '{ "sub": \"${currentSession.id}\","role": \"${currentSession.roles[0]}\"}';`
        );
      const [, user , entreprise , results] = await this.prismaClientsLocal.$transaction([
        this.prismaClientsLocal.$queryRawUnsafe(
          `set "request.jwt.claims" to '{ "sub": \"${currentSession.id}\","role": \"${currentSession.roles[0]}\"}';`
        ),
        this.prismaClientsLocal.$queryRawUnsafe(
          // `select current_entreprise_id();`,
          `select requesting_user_role();`
        ),
        this.prismaClientsLocal.$queryRawUnsafe(
         `select current_entreprise_id();`,
        ),
        // @ts-ignore
        this.prismaClientsLocal[modelName][params.action](params.args),
      ]);
      console.info("results",user , entreprise ,currentSession);
      console.log("this is the result",results)

      return results;
    });
  }

  getCurrentUser() {
    const session: any = RequestContext.currentContext.req;
    return session.user;
  }
}
