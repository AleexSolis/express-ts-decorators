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
