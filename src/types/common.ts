type MetaData = {
  method: "get" | "post" | "put" | "delete";
  path: string | string[];
}

class RouteController {
  path?: string;
}

declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;

declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;

export { MetaData, RouteController, ClassDecorator, MethodDecorator };
