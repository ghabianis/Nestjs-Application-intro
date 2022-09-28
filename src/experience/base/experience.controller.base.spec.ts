import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { ExperienceController } from "../experience.controller";
import { ExperienceService } from "../experience.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  occupiedPosition: "exampleOccupiedPosition",
  companyName: "exampleCompanyName",
  startDate: new Date(),
  endDate: new Date(),
  isWorking: "true",
  country: "exampleCountry",
  description: "exampleDescription",
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  occupiedPosition: "exampleOccupiedPosition",
  companyName: "exampleCompanyName",
  startDate: new Date(),
  endDate: new Date(),
  isWorking: "true",
  country: "exampleCountry",
  description: "exampleDescription",
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    occupiedPosition: "exampleOccupiedPosition",
    companyName: "exampleCompanyName",
    startDate: new Date(),
    endDate: new Date(),
    isWorking: "true",
    country: "exampleCountry",
    description: "exampleDescription",
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  occupiedPosition: "exampleOccupiedPosition",
  companyName: "exampleCompanyName",
  startDate: new Date(),
  endDate: new Date(),
  isWorking: "true",
  country: "exampleCountry",
  description: "exampleDescription",
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

describe("Experience", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ExperienceService,
          useValue: service,
        },
      ],
      controllers: [ExperienceController],
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

  test("POST /experiences", async () => {
    await request(app.getHttpServer())
      .post("/experiences")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        startDate: CREATE_RESULT.startDate.toISOString(),
        endDate: CREATE_RESULT.endDate.toISOString(),
      });
  });

  test("GET /experiences", async () => {
    await request(app.getHttpServer())
      .get("/experiences")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          startDate: FIND_MANY_RESULT[0].startDate.toISOString(),
          endDate: FIND_MANY_RESULT[0].endDate.toISOString(),
        },
      ]);
  });

  test("GET /experiences/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/experiences"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /experiences/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/experiences"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        startDate: FIND_ONE_RESULT.startDate.toISOString(),
        endDate: FIND_ONE_RESULT.endDate.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
