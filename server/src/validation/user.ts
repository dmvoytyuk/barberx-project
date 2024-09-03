import joi from 'joi';

import type { IUser } from '../@types/IUser.interface.ts';

import { UserRole } from '../@types/enums/UserRole.enum.ts';

const update = joi.object<any, false, Partial<IUser>>({
  name: joi.string().min(3).max(32),
  email: joi.string().email(),
  password: joi.string().min(8).max(64),
  phone: joi.string().min(10),
  role: joi.string().valid(UserRole.barber, UserRole.client),
  favorites: joi.array().items('string').unique(),
});

export default { update };
