import { model, Schema, type Model } from 'mongoose';
import type { ISession } from '../../@types/Session.interface.ts';

const session = new Schema<ISession, Model<ISession>>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    refreshTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Session: Model<ISession> = model<ISession>('sessions', session);
