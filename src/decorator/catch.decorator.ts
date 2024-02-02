import { Request, Response } from "express";

export function Catch(): MethodDecorator {
  return (
    _target: unknown,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response) {
      try {
        return await originalMethod.apply(this, [req, res]);
      } catch (error) {
        console.log("🚀 ~ error:", error);
        res.status(500).json({ error: "Error en el servidor" });
      }
    };
  };
}
