import { Request, Response } from "express";
import { Reset, FgRed } from "../tools";

// This is a decorator that catches exceptions and logs them, is used in functions from controllers
export function Catch(): MethodDecorator {
  return (
    _target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (req: Request, res: Response) {
      try {
        return await originalMethod.apply(this, [req, res]);
      } catch (e: any) {
        if (!(req && res)) {
          throw e;
        }

        console.log(`${FgRed}%s${Reset}`, `ERROR [${String(propertyKey)}]: ${e.message}`, {
          body: JSON.stringify(req.body),
          query: JSON.stringify(req.query),
        });

        if (e.response && e.response.data && e.response.status) {
          res
            .status(e.response.status)
            .json({ message: e.response.data.message });
        } else {
          res.status(500).json({ message: e.message });
        }
      }
    };
  };
}
