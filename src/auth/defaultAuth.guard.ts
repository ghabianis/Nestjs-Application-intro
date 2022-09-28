import { JwtAuthGuard } from "./jwt/jwtAuth.guard";

export class DefaultAuthGuard extends JwtAuthGuard {
  static DefaultAuthGuard(DefaultAuthGuard: any, ACGuard: any) {
    throw new Error("Method not implemented.");
  }
}
