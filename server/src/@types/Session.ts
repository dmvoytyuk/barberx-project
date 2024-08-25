import type { ObjectId } from 'mongoose';

export type UserSession = {
  _id: ObjectId;
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
};

export type UserCookies = Pick<
  UserSession,
  'refreshToken' | 'refreshTokenValidUntil'
>;
