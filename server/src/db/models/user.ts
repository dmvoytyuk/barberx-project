import { model, Schema } from 'mongoose';
import { User } from '../../@types/User.ts';

const user = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date },
    liked: { type: [Number], default: [] },
    disliked: { type: [Number], default: [] },
  },
  { timestamps: true, versionKey: false }
);

export const Users = model('users', user);
