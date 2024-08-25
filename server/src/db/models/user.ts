import { model, Schema } from 'mongoose';

import { UserRole } from '../../@types/User.ts';

import type { Model } from 'mongoose';
import type { IUser } from '../../@types/User.ts';

const user = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: null },
    role: { enum: UserRole, default: UserRole.client },
    favorites: { type: [Schema.Types.ObjectId], default: [] },
    liked: { type: [Number], default: [] },
    disliked: { type: [Number], default: [] },
  },
  { timestamps: true, versionKey: false }
);

export const Users: Model<IUser> = model<IUser>('users', user);
