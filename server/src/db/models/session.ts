import { model, Schema, type Model } from 'mongoose';
import type { ISession } from '../../@types/Session.ts';

const session = new Schema<ISession>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    accessToken: { type: String, required: true },
    sessionToken: { type: String, required: true },
    accessTokenValidUntil: { type: Date, required: true },
    sessionTokenValidUntil: { type: Date, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const Sessions: Model<ISession> = model<ISession>('sessions', session);
