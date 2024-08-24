import { ObjectId } from 'mongoose';

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

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Omit<RegisterCredentials, 'name'>;

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
