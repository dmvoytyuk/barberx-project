import { Request } from 'express';
import { User } from './User.ts';

export type IAuthRequest = Request & {
  user?: User;
};
