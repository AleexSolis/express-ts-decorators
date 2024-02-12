import request from "supertest";
import express, { Request, Response } from "express";
import { generateRoutes } from "./generate";
import { RouteController } from "../types/common";
import { Controller, Get } from "../decorator/controller.decorator";

describe("GenerateRoutes", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Success - Controller with path", async () => {
    @Controller("/test")
    class TestController extends RouteController {
      @Get("/test")
      getTest(_: Request, res: Response) {
        res.send("Test");
      }
    }

    const app = express();
    const router = generateRoutes([TestController]);
    app.use(router);

    const response = await request(app).get("/test/test");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Test");
  });

  it("Success - Controller without path", async () => {
    @Controller()
    class TestController extends RouteController {
      @Get("/test")
      getTest(_: Request, res: Response) {
        res.send("Test");
      }
    }

    const app = express();
    const router = generateRoutes([TestController]);
    app.use(router);

    const response = await request(app).get("/test");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Test");
  });
});
