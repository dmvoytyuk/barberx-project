import type { Document, ObjectId } from 'mongoose';

export interface ISession extends Document<ObjectId> {
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}

export enum Token {
  sessionId = 'sessionId',
  accessToken = 'accessToken',
  refreshToken = 'refreshToken',
  accessTokenValidUntil = 'accessTokenValidUntil',
  refreshTokenValidUntil = 'refreshTokenValidUntil',
}
