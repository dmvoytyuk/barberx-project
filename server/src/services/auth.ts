import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import type { LoginCredentials, RegisterCredentials } from '../@types/User.ts';
import type { ObjectId } from 'mongoose';

import { Users } from '../db/models/user.ts';
import { Sessions } from '../db/models/session.ts';
import { createSession } from '../utils/createSession.ts';

export const registerUser = async (payload: RegisterCredentials) => {
  const isAlreadyInUse = await Users.findOne({ email: payload.email });
  if (isAlreadyInUse) {
    throw createHttpError(409, 'Email is already in use');
  }

  const password = await bcrypt.hash(payload.password, 10);

  return await Users.create({
    ...payload,
    password,
  });
};

export const loginUser = async (payload: LoginCredentials) => {
  const user = await Users.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isPasswordCorrect = bcrypt.compare(payload.password, user.password);

  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Unauthorized');
  }
  await Sessions.findOneAndDelete({ userId: user._id });

  return await Sessions.create({ ...createSession(user._id) });
};

export const logoutUser = async (id: ObjectId) => {
  await Sessions.findByIdAndDelete(id);
};
