import type { NextFunction, Request, Response } from 'express';
import type { IUser } from './User.interface.ts';
import type { HydratedDocument } from 'mongoose';

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

declare module 'express-session' {
  interface SessionData {
    auth?: { accessToken: string; accessTokenValidUntil: Date } | null;
    user?: HydratedDocument<IUser> | null;
  }
  // interface SessionOptions {
  //   [prop: string]: any;
  // }
}
