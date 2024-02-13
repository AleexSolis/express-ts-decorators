import express, { Request, Response } from "express";
import request from "supertest";
import { Controller, Delete, Get, Post, Put } from "./controller.decorator";
import { RouteController } from "../types/common";

describe("Controller", () => {
  it("Success - Path", () => {
    @Controller()
    class TestController extends RouteController {}

    const controller = new TestController();
    expect(controller.path).toEqual("/");
  });
});

describe("Methods", () => {
  @Controller("/test")
  class TestController {
    @Get()
    getMethod() {
      return "Hello World";
    }

    @Post()
    postMethod() {
      return "Hello World";
    }

    @Put("/put")
    putMethod() {
      return "Hello World";
    }

    @Delete("/delete")
    deleteMethod() {
      return "Hello World";
    }
  }

  it("Success - Get", () => {
    const getMetadata = Reflect.getMetadata(
      "Controller",
      TestController.prototype,
      "getMethod"
    );

    expect(getMetadata).toEqual({ method: "get", path: "/" });
  });

  it("Success - Post", () => {
    const postMetadata = Reflect.getMetadata(
      "Controller",
      TestController.prototype,
      "postMethod"
    );

    expect(postMetadata).toEqual({ method: "post", path: "/" });
  });

  it("Success - Put", () => {
    const putMetadata = Reflect.getMetadata(
      "Controller",
      TestController.prototype,
      "putMethod"
    );

    expect(putMetadata).toEqual({ method: "put", path: "/put" });
  });

  it("Success - Delete", () => {
    const deleteMetadata = Reflect.getMetadata(
      "Controller",
      TestController.prototype,
      "deleteMethod"
    );

    expect(deleteMetadata).toEqual({ method: "delete", path: "/delete" });
  });
});

describe("Methods - Responses", () => {
  @Controller()
  class TestController {
    @Get("/return")
    getMethodReturn() {
      return "Hello World return";
    }

    @Get("/response")
    getResponse(_: Request, res: Response) {
      res.status(200).send("Hello World response");
    }

    @Get("/return-response")
    getMethodReturnResponse(_: Request, res: Response) {
      res.status(200).send("Hello World response");
      return "Hello World return";
    }
  }

  it("Success - return", async () => {
    const app = express();
    const testClass = new TestController();

    app.get("/return", testClass.getMethodReturn);

    const response = await request(app).get("/return");

    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World return");
  });

  it("Success - response", async () => {
    const app = express();
    const testClass = new TestController();

    app.get("/response", testClass.getResponse);

    const response = await request(app).get("/response");

    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World response");
  });

  it("Success - return-response", async () => {
    const app = express();
    const testClass = new TestController();

    app.get("/return-response", testClass.getMethodReturnResponse);

    const response = await request(app).get("/return-response");

    expect(response.status).toBe(200);
    expect(response.text).toEqual("Hello World response");
  });
});
