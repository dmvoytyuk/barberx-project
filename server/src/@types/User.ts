import type { Document, ObjectId } from 'mongoose';

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

export type RegisterCredentials = Pick<IUser, 'name' | 'email' | 'password'>;

export type LoginCredentials = Pick<IUser, 'email' | 'password'>;

export enum UserRole {
  client = 'client',
  barber = 'barber',
}
