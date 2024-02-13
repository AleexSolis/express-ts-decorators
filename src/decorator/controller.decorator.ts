import "reflect-metadata";
import { Request, Response } from "express";
import { Reset, FgYellow, FgRed } from "../tools";

export function Controller(prefix?: string): ClassDecorator {
  const defaultPath = "/";

  return (target) => {
    target.prototype.path = prefix || defaultPath;
  };
}

function MethodDecoratorFactory(method: string, path = "/"): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    Reflect.defineMetadata("Controller", { method, path }, target, propertyKey);
    descriptor.value = async function (req: Request, res: Response) {
      const result = await originalMethod.apply(this, [req, res]);
      if (result !== undefined) {
        try {
          res.status(200).send(result);
        } catch (error: any) {
          if (error.code === "ERR_HTTP_HEADERS_SENT") {
            console.warn(
              `${FgYellow}%s${Reset}`,
              `WARN [ControllerDecorator]: ${String(
                propertyKey
              )} method of controller ${
                target.constructor.name
              } sends the response using 'res' and also returns a value, this can cause problems and therefore only the 'res' response is used.`
            );
          }
        }
      }
    };
  };
}

export const Get = (path?: string) => MethodDecoratorFactory("get", path);
export const Post = (path?: string) => MethodDecoratorFactory("post", path);
export const Put = (path?: string) => MethodDecoratorFactory("put", path);
export const Delete = (path?: string) => MethodDecoratorFactory("delete", path);
