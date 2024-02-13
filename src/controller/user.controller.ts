import { Request, Response } from "express";
import { Controller, Get, Post } from "../decorator/controller.decorator";
import { RouteController } from "../types/common";
import { Catch } from "../decorator/catch.decorator";

@Controller("/users")
export class Users extends RouteController {
  @Get("/all")
  @Catch()
  getUsers(req: Request, res: Response) {
    res.status(200).send("All users");
    return { data: "All users" };
  }

  @Get("/error")
  @Catch()
  getUserError(req: Request) {
    throw new Error("Test error");
  }

  @Get("/byId")
  getUserById(req: Request) {
    return { data: "User by id" };
  }
}
