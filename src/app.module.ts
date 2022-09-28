import { CacheModule, Global, Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { CandidateModule } from "./candidate/candidate.module";
import { RecruiterModule } from "./recruiter/recruiter.module";
import { EntrepriseModule } from "./entreprise/entreprise.module";
import { ChatroomModule } from "./chatroom/chatroom.module";
import { ChatModule } from "./chat/chat.module";
import { MessageModule } from "./message/message.module";
import { CandidatesOnChatroomModule } from "./candidatesOnChatroom/candidatesOnChatroom.module";
import { FollowEntrepriseModule } from "./followEntreprise/followEntreprise.module";
import { SurveyModule } from "./survey/survey.module";
import { ExperienceModule } from "./experience/experience.module";
import { CourseModule } from "./course/course.module";
import { ContractModule } from "./contract/contract.module";
import { SkillModule } from "./skill/skill.module";
import { QuestionModule } from "./question/question.module";
import { QuestionTypeModule } from "./questionType/questionType.module";
import { FeedbackModule } from "./feedback/feedback.module";
import { CommentModule } from "./comment/comment.module";
import { CommunityModule } from "./community/community.module";
import { OffersOnCommunityModule } from "./offersOnCommunity/offersOnCommunity.module";
import { PublicationModule } from "./publication/publication.module";
import { PublicationsOnCommunityModule } from "./publicationsOnCommunity/publicationsOnCommunity.module";
import { EventModule } from "./event/event.module";
import { PostModule } from "./post/post.module";
import { OfferModule } from "./offer/offer.module";
import { StoryModule } from "./story/story.module";
import { VideoModule } from "./video/video.module";
import { CategoryModule } from "./category/category.module";
import { JobModule } from "./job/job.module";
import { SocialinterractionModule } from "./socialinterraction/socialinterraction.module";
import { UsersSkillModule } from "./usersSkill/usersSkill.module";
import { UsersOnCommunityModule } from "./usersOnCommunity/usersOnCommunity.module";
import { UsersOnEntrepriseModule } from "./usersOnEntreprise/usersOnEntreprise.module";
import { EntreprisesOnCommunityModule } from "./entreprisesOnCommunity/entreprisesOnCommunity.module";
import { ContractsOnCandidateModule } from "./contractsOnCandidate/contractsOnCandidate.module";
import { ACLModule } from "./auth/acl.module";
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";
import { SecretsManagerModule } from "./providers/secrets/secretsManager.module";
import { MorganModule } from "nest-morgan";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ServeStaticOptionsService } from "./serveStaticOptions.service";
import { GraphQLModule } from "@nestjs/graphql";
import { RequestContextModule } from "nestjs-request-context";
import { ImageKitModule } from "./imageKit/imageKit.module";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from 'path';

@Global()
@Module({
  controllers: [],
  imports: [
    CacheModule.register(),
    MulterModule.register({
      dest: './files',
    }),
    UserModule,
    CandidateModule,
    RecruiterModule,
    EntrepriseModule,
    ChatroomModule,
    ChatModule,
    MessageModule,
    CandidatesOnChatroomModule,
    FollowEntrepriseModule,
    SurveyModule,
    ExperienceModule,
    CourseModule,
    ContractModule,
    SkillModule,
    QuestionModule,
    QuestionTypeModule,
    FeedbackModule,
    CommentModule,
    CommunityModule,
    OffersOnCommunityModule,
    PublicationModule,
    PublicationsOnCommunityModule,
    EventModule,
    PostModule,
    OfferModule,
    StoryModule,
    VideoModule,
    CategoryModule,
    JobModule,
    SocialinterractionModule,
    UsersSkillModule,
    UsersOnCommunityModule,
    UsersOnEntrepriseModule,
    EntreprisesOnCommunityModule,
    ContractsOnCandidateModule,
    ACLModule,
    AuthModule,
    HealthModule,
    SecretsManagerModule,
    MorganModule,
    RequestContextModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticOptionsService,
    }),
    GraphQLModule.forRootAsync({
      useFactory: (configService) => {
        const playground = configService.get("GRAPHQL_PLAYGROUND");
        const introspection = configService.get("GRAPHQL_INTROSPECTION");
        return {
          autoSchemaFile: "schema.graphql",
          sortSchema: true,
          playground,
          introspection: playground || introspection,
        };
      },
      inject: [ConfigService],
      imports: [ConfigModule.forRoot()],
    }),
    ImageKitModule

  ],
  providers: [],
})
export class AppModule { }
