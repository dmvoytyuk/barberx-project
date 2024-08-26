import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import type { ObjectId } from 'mongoose';
import type { LoginCredentials, RegisterCredentials } from '../@types/User.ts';

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

  return await Sessions.create(createSession(user._id));
};

export const logoutUser = async (id: ObjectId) => {
  await Sessions.findByIdAndDelete(id);
};

export const refreshSession = async (
  sessionId: ObjectId,
  refreshToken: string
) => {
  const currentSession = await Sessions.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!currentSession) {
    throw createHttpError(401, 'Session not found. Please, log in');
  }

  const isSessionTokenExpired =
    new Date() > new Date(currentSession.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired. Please, log in');
  }

  return await Sessions.create(createSession(currentSession.userId));
};
