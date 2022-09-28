import { Test } from "@nestjs/testing";
import { INestApplication, HttpStatus, ExecutionContext } from "@nestjs/common";
import request from "supertest";
import { MorganModule } from "nest-morgan";
import { ACGuard } from "nest-access-control";
import { DefaultAuthGuard } from "../../auth/defaultAuth.guard";
import { ACLModule } from "../../auth/acl.module";
import { ChatroomController } from "../chatroom.controller";
import { ChatroomService } from "../chatroom.service";

const nonExistingId = "nonExistingId";
const existingId = "existingId";
const CREATE_INPUT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "exampleTitle",
  startDateTime: new Date(),
  endDateTime: new Date(),
};
const CREATE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "exampleTitle",
  startDateTime: new Date(),
  endDateTime: new Date(),
};
const FIND_MANY_RESULT = [
  {
    id: "exampleId",
    createdAt: new Date(),
    updatedAt: new Date(),
    title: "exampleTitle",
    startDateTime: new Date(),
    endDateTime: new Date(),
  },
];
const FIND_ONE_RESULT = {
  id: "exampleId",
  createdAt: new Date(),
  updatedAt: new Date(),
  title: "exampleTitle",
  startDateTime: new Date(),
  endDateTime: new Date(),
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

describe("Chatroom", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: ChatroomService,
          useValue: service,
        },
      ],
      controllers: [ChatroomController],
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

  test("POST /chatrooms", async () => {
    await request(app.getHttpServer())
      .post("/chatrooms")
      .send(CREATE_INPUT)
      .expect(HttpStatus.CREATED)
      .expect({
        ...CREATE_RESULT,
        createdAt: CREATE_RESULT.createdAt.toISOString(),
        updatedAt: CREATE_RESULT.updatedAt.toISOString(),
        startDateTime: CREATE_RESULT.startDateTime.toISOString(),
        endDateTime: CREATE_RESULT.endDateTime.toISOString(),
      });
  });

  test("GET /chatrooms", async () => {
    await request(app.getHttpServer())
      .get("/chatrooms")
      .expect(HttpStatus.OK)
      .expect([
        {
          ...FIND_MANY_RESULT[0],
          createdAt: FIND_MANY_RESULT[0].createdAt.toISOString(),
          updatedAt: FIND_MANY_RESULT[0].updatedAt.toISOString(),
          startDateTime: FIND_MANY_RESULT[0].startDateTime.toISOString(),
          endDateTime: FIND_MANY_RESULT[0].endDateTime.toISOString(),
        },
      ]);
  });

  test("GET /chatrooms/:id non existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/chatrooms"}/${nonExistingId}`)
      .expect(404)
      .expect({
        statusCode: 404,
        message: `No resource was found for {"${"id"}":"${nonExistingId}"}`,
        error: "Not Found",
      });
  });

  test("GET /chatrooms/:id existing", async () => {
    await request(app.getHttpServer())
      .get(`${"/chatrooms"}/${existingId}`)
      .expect(HttpStatus.OK)
      .expect({
        ...FIND_ONE_RESULT,
        createdAt: FIND_ONE_RESULT.createdAt.toISOString(),
        updatedAt: FIND_ONE_RESULT.updatedAt.toISOString(),
        startDateTime: FIND_ONE_RESULT.startDateTime.toISOString(),
        endDateTime: FIND_ONE_RESULT.endDateTime.toISOString(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
