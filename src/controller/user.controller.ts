import { Request, Response } from "express";
import { Controller, Get, Post } from "../decorator/controller.decorator";
import { RouteController } from "../types/common";
import { Catch } from "../decorator/catch.decorator";

@Controller("/users")
export class Users extends RouteController {
  
  @Get("/all")
  @Catch()
  getUsers(req: Request, res: Response) {
    throw new Error("Error");
    
  }
  
  @Post("/byId")
  getUserById(req: Request, res: Response) {
    res.send("User by id");
  }
}