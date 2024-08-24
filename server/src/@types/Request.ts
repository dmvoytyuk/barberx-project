import { Request } from 'express';
import { User } from './User.ts';

export interface IAuthRequest extends Request {
  user: User;
}
