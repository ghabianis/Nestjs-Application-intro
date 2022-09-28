import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { EntrepriseController } from "../entreprise.controller";
import { EntrepriseService } from "../entreprise.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "exampleName",
  owner: "exampleOwner",
  presentationContent: "examplePresentationContent",
  presentationVideolink: "examplePresentationVideolink",
  websiteLink: "exampleWebsiteLink",
  linkedinLink: "exampleLinkedinLink",
  instagramLink: "exampleInstagramLink",
  departement: "exampleDepartement",
  workersNumber: 42,
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "exampleName",
  owner: "exampleOwner",
  presentationContent: "examplePresentationContent",
  presentationVideolink: "examplePresentationVideolink",
  websiteLink: "exampleWebsiteLink",
  linkedinLink: "exampleLinkedinLink",
  instagramLink: "exampleInstagramLink",
  departement: "exampleDepartement",
  workersNumber: 42,
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    name: "exampleName",
    owner: "exampleOwner",
    presentationContent: "examplePresentationContent",
    presentationVideolink: "examplePresentationVideolink",
    websiteLink: "exampleWebsiteLink",
    linkedinLink: "exampleLinkedinLink",
    instagramLink: "exampleInstagramLink",
    departement: "exampleDepartement",
    workersNumber: 42,
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  name: "exampleName",
  owner: "exampleOwner",
  presentationContent: "examplePresentationContent",
  presentationVideolink: "examplePresentationVideolink",
  websiteLink: "exampleWebsiteLink",
  linkedinLink: "exampleLinkedinLink",
  instagramLink: "exampleInstagramLink",
  departement: "exampleDepartement",
  workersNumber: 42,
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

describe("Entreprise", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: EntrepriseService,
          useValue: service,
        },
      ],
      controllers: [EntrepriseController],
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

  test("POST /entreprises", async () => {
    await request(app.getHttpServer())
      .post("/entreprises")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
      });
  });

  test("GET /entreprises", async () => {
    await request(app.getHttpServer())
      .get("/entreprises")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
        },
      ]);
  });

  test("GET /entreprises/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/entreprises"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /entreprises/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/entreprises"}/${existingId}`)
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
