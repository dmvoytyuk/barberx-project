import type { ObjectId } from 'mongoose';

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

export type RegisterCredentials = Pick<User, 'name' | 'email' | 'password'>;

export type LoginCredentials = Pick<User, 'email' | 'password'>;

// enum UserKeys {
//   _id = '_id',
//   name = 'name',
//   email = 'email',
//   password = 'password',
//   phone = 'phone',
//   dob = 'dob',
//   liked = 'liked',
//   disliked = 'disliked',
// }
