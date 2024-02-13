export type MetaData = {
  method: "get" | "post" | "put" | "delete";
  path: string | string[];
};

export class RouteController {
  path: string | undefined;
}

export declare type ClassDecorator = <TFunction extends Function>(
  target: TFunction
) => TFunction | void;

export declare type MethodDecorator = <T>(
  target: Object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
) => TypedPropertyDescriptor<T> | void;
