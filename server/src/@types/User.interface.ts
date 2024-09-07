import type { Document, ObjectId } from 'mongoose';
import type { UserRole } from './enums/UserRole.enum.ts';

export interface IUser extends Document<ObjectId> {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole.barber | UserRole.client;
  favorites: ObjectId[];
  liked?: ObjectId[];
  disliked?: ObjectId[];
}


