import { randomBytes } from 'crypto';
import { ObjectId } from 'mongoose';

import { FIFTEEN_MINUTES, ONE_MINUTE, ONE_MONTH } from '../constants/index.ts';
import { UserSession } from '../@types/Session.ts';

export const createSession = (userId: ObjectId): Omit<UserSession, '_id'> => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_MINUTE),
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};
