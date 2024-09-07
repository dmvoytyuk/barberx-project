import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import type { ObjectId } from 'mongoose';
import type { LoginCredentials } from '../@types/LoginCredentials.type.ts';
import type { RegisterCredentials } from '../@types/RegisterCredentials.type.ts';

import { User } from '../db/models/user.ts';
import { Session } from '../db/models/session.ts';
import { createSession } from '../utils/createSession.ts';

export const registerUser = async (payload: RegisterCredentials) => {
  const isAlreadyInUse = await User.findOne({ email: payload.email });
  if (isAlreadyInUse) {
    throw createHttpError(409, 'Email is already in use');
  }

  const password = await bcrypt.hash(payload.password, 10);

  return await User.create({
    ...payload,
    password,
  });
};

export const loginUser = async (payload: LoginCredentials) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isPasswordCorrect = bcrypt.compare(payload.password, user.password);

  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Unauthorized');
  }
  await Session.findOneAndDelete({ userId: user._id });

  return await Session.create(createSession(user._id));
};

export const logoutUser = async (id: ObjectId) => {
  await Session.findByIdAndDelete(id);
};

export const refreshSession = async (
  sessionId: ObjectId,
  refreshToken: string
) => {
  const currentSession = await Session.findOne({
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

  return await Session.create(createSession(currentSession.userId));
};
