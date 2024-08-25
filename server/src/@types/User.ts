import type { Document, ObjectId } from 'mongoose';

export interface IUser extends Document<ObjectId> {
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  liked?: number[];
  disliked?: number[];
}

export type RegisterCredentials = Pick<IUser, 'name' | 'email' | 'password'>;

export type LoginCredentials = Pick<IUser, 'email' | 'password'>;
