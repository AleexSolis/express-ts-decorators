import express from "express";
import { MetaData, RouteController } from "../types/common";

const router = express.Router();

const generateRoutes = (controllers: (typeof RouteController)[]) => {
  controllers.forEach((Route) => {
    const route = new Route();
    Object.getOwnPropertyNames(Route.prototype).forEach((key) => {
      const item = route[key as keyof RouteController];
      if (key !== "constructor" && typeof item == "function") {
        const metadata: MetaData = Reflect.getMetadata(
          "Controller",
          Route.prototype,
          key
        );
        if (metadata) {
          const { method, path } = metadata;
          const prefix = route.path || "/";
          router[method](prefix + path, item);
          console.log(
            `[Server]: Route ${method} ${route.path}${path}} registered`
          );
        }
      }
    });
  });
  return router;
};

export { generateRoutes };
