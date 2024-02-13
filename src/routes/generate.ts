import express from "express";
import { MetaData, RouteController } from "../types/common";
import { Reset, FgGreen } from "../tools";

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
            `${FgGreen}%s${Reset}`,
            `LOG [GenerateRoutes]: Route ${method} ${route.path}${path} registered`
          );
        }
      }
    });

    mainRouter.use(`${route.path}`, router);
  });
  return mainRouter;
};

export { generateRoutes };
