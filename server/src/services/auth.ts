import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import { Types } from 'mongoose';
import type { LoginCredentials } from '../@types/LoginCredentials.type.ts';
import type { RegisterCredentials } from '../@types/RegisterCredentials.type.ts';

import UserModel from '../db/models/user.ts';

const register = async (payload: RegisterCredentials) => {
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

const login = async (payload: LoginCredentials) => {
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
  return user;
};

export default { register, login };
