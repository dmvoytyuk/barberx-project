import type { Model, Types } from 'mongoose';
import type { UserRole } from './enums/UserRole.enum.ts';

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole.barber | UserRole.client;
  favorites: Types.ObjectId[];
  liked?: Types.ObjectId[];
  disliked?: Types.ObjectId[];
}
