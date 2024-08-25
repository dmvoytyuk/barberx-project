import type { Request } from 'express';

export type IAuthRequest = Request & {
  userId?: string;
};
