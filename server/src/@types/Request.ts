import type { Request } from 'express';
import type { User } from './User.ts';

export interface IAuthRequest extends Request {
  user?: User;
}
