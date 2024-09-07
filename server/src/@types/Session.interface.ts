import type { Document, ObjectId } from 'mongoose';

export interface ISession extends Document<ObjectId> {
  userId: ObjectId;
  accessToken: string;
  refreshToken: string;
  accessTokenValidUntil: Date;
  refreshTokenValidUntil: Date;
}
