import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import { Types } from 'mongoose';
import type { LoginCredentials } from '../@types/LoginCredentials.type.ts';
import type { RegisterCredentials } from '../@types/RegisterCredentials.type.ts';

import { UserModel } from '../db/models/user.ts';
import { SessionModel } from '../db/models/session.ts';
import { createSession } from '../utils/createSession.ts';

export const registerUser = async (payload: RegisterCredentials) => {
  const isEmailInUse = await UserModel.findOne({ email: payload.email });
  if (isEmailInUse) {
    throw createHttpError(409, 'Email is already in use');
  }

  const password = await bcrypt.hash(payload.password, 10);

  return await UserModel.create({
    ...payload,
    password,
  });
};

export const loginUser = async (payload: LoginCredentials) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw createHttpError(401, 'Unauthorized');
  }
  // await SessionModel.findOneAndDelete({ userId: user._id });
  return user;
};

export const logoutUser = async (id: Types.ObjectId) => {
  await SessionModel.findByIdAndDelete(id);
};

export const refreshSession = async (
  sessionId: Types.ObjectId,
  refreshToken: string
) => {
  const currentSession = await SessionModel.findOne({
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

  return await SessionModel.create(createSession(currentSession.userId));
};
