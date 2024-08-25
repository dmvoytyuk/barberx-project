import type { Document, ObjectId } from 'mongoose';

export type User = {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  phone: string;
  dob: Date;
  liked?: number[];
  disliked?: number[];
};

export interface IUser extends Omit<User, '_id'>, Document {}

export type RegisterCredentials = Pick<User, 'name' | 'email' | 'password'>;

export type LoginCredentials = Pick<User, 'email' | 'password'>;
