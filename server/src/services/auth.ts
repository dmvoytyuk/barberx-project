import createHttpError from 'http-errors';
import bcrypt from 'bcryptjs';

import type { RegisterCredentials } from '../@types/User.ts';

import { Users } from '../db/models/user.ts';

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
