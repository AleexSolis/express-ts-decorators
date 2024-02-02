import "reflect-metadata";

export function Controller(prefix?: string): ClassDecorator {
  const defaultPath = "/";

  return (target) => {
    target.prototype.path = prefix || defaultPath;
  };
}

function MethodDecoratorFactory(
  method: string,
  path: string | string[] = "/"
): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol
  ) => {
    Reflect.defineMetadata("Controller", { method, path }, target, propertyKey);
  };
}

export const Get = (path?: string | string[]) => MethodDecoratorFactory("get", path);
export const Post = (path?: string | string[]) => MethodDecoratorFactory("post", path);
export const Put = (path?: string | string[]) => MethodDecoratorFactory("put", path);
export const Delete = (path?: string | string[]) => MethodDecoratorFactory("delete", path);
