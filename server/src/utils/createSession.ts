import { randomBytes } from 'crypto';
import { ObjectId } from 'mongoose';

import { FIFTEEN_MINUTES, ONE_MINUTE, ONE_MONTH } from '../constants/index.ts';

export const createSession = (userId: ObjectId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ONE_MINUTE), // for testing purposes
    // accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_MONTH),
  };
};
