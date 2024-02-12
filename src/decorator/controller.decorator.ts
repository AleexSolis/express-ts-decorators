import 'reflect-metadata';
import { Request, Response } from 'express';

export function Controller(prefix?: string): ClassDecorator {
  const defaultPath = '/';

  return (target) => {
    target.prototype.path = prefix || defaultPath;
  };
}

function MethodDecoratorFactory(method: string, path = '/'): MethodDecorator {
  return (
    target: object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    Reflect.defineMetadata('Controller', { method, path }, target, propertyKey);
    descriptor.value = async function (req: Request, res: Response) {
      const result = await originalMethod.apply(this, [req, res]);
      res.status(200).send(result);
    };
  };
}

export const Get = (path?: string) => MethodDecoratorFactory('get', path);
export const Post = (path?: string) => MethodDecoratorFactory('post', path);
export const Put = (path?: string) => MethodDecoratorFactory('put', path);
export const Delete = (path?: string) => MethodDecoratorFactory('delete', path);
