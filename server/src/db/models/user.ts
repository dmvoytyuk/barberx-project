import { model, Schema } from 'mongoose';

import type { IUser } from '../../@types/User.interface.ts';

import { UserRole } from '../../@types/enums/UserRole.enum.ts';

const user = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, default: null },
    role: { type: String, enum: UserRole, default: UserRole.client },
    favorites: { type: [Schema.Types.ObjectId], default: [] },
    liked: { type: [Schema.Types.ObjectId], default: [] },
    disliked: { type: [Schema.Types.ObjectId], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

user.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model<IUser>('users', user);
