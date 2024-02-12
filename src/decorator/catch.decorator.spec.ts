import request from "supertest";
import express from "express";
import { Catch } from "./catch.decorator";
import { HttpException } from "../types/httpException";

class TestClass {
  @Catch()
  async commonError() {
    throw new Error("Common error");
  }

  @Catch()
  async httpError() {
    throw new HttpException(404, "HTTP Error");
  }
}

describe("Catch", () => {
  it("Success - Common uncontrolled error", async () => {
    const app = express();
    const testClass = new TestClass();

    app.get("/test", testClass.commonError);

    const response = await request(app).get("/test");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Common error" });
  });

  it("Success - HTTP error", async () => {
    const app = express();
    const testClass = new TestClass();

    app.get("/test", testClass.httpError);

    const response = await request(app).get("/test");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "HTTP Error" });
  });

  it("Success - Decorator outside controller", async () => {
    const testClass = new TestClass();

    expect(testClass.commonError()).rejects.toThrowError("Common error");
  });
});
