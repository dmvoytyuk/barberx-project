import type { NextFunction } from 'express';

export type Controller<T, U> = (
  req: T,
  res: U,
  next: NextFunction
) => Promise<void> | void;
