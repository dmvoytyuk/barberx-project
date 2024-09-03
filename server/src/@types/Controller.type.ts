import type { NextFunction, Request, Response } from 'express';
import type { ISession } from './ISession.interface.ts';

declare global {
  namespace Express {
    interface Request {
      session: ISession;
    }
  }
}

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
