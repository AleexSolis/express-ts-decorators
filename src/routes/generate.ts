import express from "express";
import { MetaData, RouteController } from "../types/common";

const generateRoutes = (controllers: (typeof RouteController)[]) => {
  const mainRouter = express.Router();

  controllers.forEach((Route) => {
    const route = new Route();
    const router = express.Router();
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
          router[method](path, item);
          console.log(
            `[Server]: Route ${method} ${route.path}${path} registered`
          );
        }
      }
    });
    
    const controllerPath = route.path || "/";
    mainRouter.use(controllerPath, router);
  });
  return mainRouter;
};

export { generateRoutes };
