import { ObjectId } from 'mongoose';

export type UserSession = {
  _id: ObjectId;
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
};

export type UserCookies = {
  refreshToken: string;
  sessionId: string;
};
