import { CacheModule, forwardRef, Module } from "@nestjs/common";
import { DbService } from "src/dbService/db.service";
import { RecruiterModuleBase } from "./base/recruiter.module.base";
import { RecruiterService } from "./recruiter.service";
import { RecruiterController } from "./recruiter.controller";
import { RecruiterResolver } from "./recruiter.resolver";
import { UserService } from "src/user/user.service";
import { TokenService } from "src/auth/token.service";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { SecretsManagerModule } from "src/providers/secrets/secretsManager.module";
import { JwtModule } from "@nestjs/jwt";
import { SecretsManagerService } from "src/providers/secrets/secretsManager.service";
import { ConfigService } from "@nestjs/config";
import { JWT_EXPIRATION, JWT_SECRET_KEY } from "src/constants";
import { PrismaService } from "nestjs-prisma";
import { PasswordService } from "src/auth/password.service";

@Module({
  imports: [
    CacheModule.register(),
    forwardRef(() => UserModule),
    PassportModule,
    SecretsManagerModule,
    DbService,
    JwtModule.registerAsync({
      imports: [SecretsManagerModule],
      inject: [SecretsManagerService, ConfigService],
      useFactory: async (
        secretsService: SecretsManagerService,
        configService: ConfigService
      ) => {
        const secret = await secretsService.getSecret<string>(JWT_SECRET_KEY);
        const expiresIn = configService.get(JWT_EXPIRATION);
        if (!secret) {
          throw new Error("Didn't get a valid jwt secret");
        }
        if (!expiresIn) {
          throw new Error("Jwt expire in value is not valid");
        }
        return {
          secret: secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [RecruiterController],
  providers: [RecruiterService, RecruiterResolver, DbService,UserService,TokenService,PrismaService,PasswordService],
  exports: [RecruiterService],
})
export class RecruiterModule {}
