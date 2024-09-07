import joi from 'joi';

import { UserRole } from '../@types/enums/UserRole.enum.ts';
import type { IUser } from '../@types/User.interface.ts';

export const updateUserSchema = joi.object<any, false, Partial<IUser>>({
  name: joi.string().min(3).max(32),
  email: joi.string().email(),
  password: joi.string().min(8).max(64),
  phone: joi.string().min(10),
  role: joi.string().valid(UserRole.barber, UserRole.client),
  favorites: joi.array().items('string').unique(),
});
