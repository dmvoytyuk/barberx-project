import type { Document, ObjectId } from 'mongoose';

export interface ISession extends Document<ObjectId> {
  userId: ObjectId;
  accessToken: string;
  sessionToken: string;
  accessTokenValidUntil: Date;
  sessionTokenValidUntil: Date;
}

export enum Token {
  sessionId = 'sessionId',
  accessToken = 'accessToken',
  sessionToken = 'sessionToken',
  accessTokenValidUntil = 'accessTokenValidUntil',
  sessionTokenValidUntil = 'sessionTokenValidUntil',
}
