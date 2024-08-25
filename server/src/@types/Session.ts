import type { Document, ObjectId } from 'mongoose';

export interface ISession extends Document {
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}

export type UserCookies = Pick<
  ISession,
  'refreshToken' | 'refreshTokenValidUntil'
>;
