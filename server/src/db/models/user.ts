import { model, Schema } from 'mongoose';

import type { Model } from 'mongoose';
import type { IUser } from '../../@types/User.interface.ts';

import { UserRole } from '../../@types/enums/UserRole.enum.ts';

const user = new Schema<IUser, Model<IUser>>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: null },
    role: { type: String, enum: UserRole, default: UserRole.client },
    favorites: { type: [Schema.Types.ObjectId], default: [] },
    liked: { type: [Number], default: [] },
    disliked: { type: [Number], default: [] },
  },
  { timestamps: true, versionKey: false }
);

export const User: Model<IUser> = model<IUser>('users', user);
