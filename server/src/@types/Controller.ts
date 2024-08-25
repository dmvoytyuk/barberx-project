import type { NextFunction, Request, Response } from 'express';
import type { IAuthRequest } from './Request.ts';

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;
