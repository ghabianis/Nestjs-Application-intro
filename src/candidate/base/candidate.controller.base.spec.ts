import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { CandidateController } from "../candidate.controller";
import { CandidateService } from "../candidate.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  activityField: "exampleActivityField",
  wantedPost: "exampleWantedPost",
  experiencesYears: 42,
  languages: "exampleLanguages",
  tags: "exampleTags",
  maxSalary: 42.42,
  minSalary: 42.42,
  personalCv: "examplePersonalCv",
  mediaLink: "exampleMediaLink",
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  activityField: "exampleActivityField",
  wantedPost: "exampleWantedPost",
  experiencesYears: 42,
  languages: "exampleLanguages",
  tags: "exampleTags",
  maxSalary: 42.42,
  minSalary: 42.42,
  personalCv: "examplePersonalCv",
  mediaLink: "exampleMediaLink",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    activityField: "exampleActivityField",
    wantedPost: "exampleWantedPost",
    experiencesYears: 42,
    languages: "exampleLanguages",
    tags: "exampleTags",
    maxSalary: 42.42,
    minSalary: 42.42,
    personalCv: "examplePersonalCv",
    mediaLink: "exampleMediaLink",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  activityField: "exampleActivityField",
  wantedPost: "exampleWantedPost",
  experiencesYears: 42,
  languages: "exampleLanguages",
  tags: "exampleTags",
  maxSalary: 42.42,
  minSalary: 42.42,
  personalCv: "examplePersonalCv",
  mediaLink: "exampleMediaLink",
};

const service = {
  create() {
    return CREATE_RESULT;
  },
  findMany: () => FIND_MANY_RESULT,
  findOne: ({ where }: { where: { id: string } }) => {
    switch (where.id) {
      case existingId:
        return FIND_ONE_RESULT;
      case nonExistingId:
        return null;
    }
  },
};

const basicAuthGuard = {
  canActivate: (context: ExecutionContext) => {
    const argumentHost = context.switchToHttp();
    const request = argumentHost.getRequest();
    request.user = {
      roles: ["user"],
    };
    return true;
  },
};

const acGuard = {
  canActivate: () => {
    return true;
  },
};

describe("Candidate", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: CandidateService,
          useValue: service,
        },
      ],
      controllers: [CandidateController],
      imports: [MorganModule.forRoot(), ACLModule],
    })
      .overrideGuard(DefaultAuthGuard)
      .useValue(basicAuthGuard)
      .overrideGuard(ACGuard)
      .useValue(acGuard)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  test("POST /candidates", async () => {
    await request(app.getHttpServer())
      .post("/candidates")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /candidates", async () => {
    await request(app.getHttpServer())
      .get("/candidates")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /candidates/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/candidates"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /candidates/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/candidates"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
