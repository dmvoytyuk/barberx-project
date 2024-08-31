import { Schema } from 'redis-om';

export const redisSessionSchema = new Schema(
  'session',
  {
    _id: { type: 'string' },
    userId: { type: 'string' },
    accessToken: { type: 'string' },
    accessTokenValidUntil: { type: 'string' },
    refreshToken: { type: 'string' },
    refreshTokenValidUntil: { type: 'string' },
  },
  { dataStructure: 'JSON' }
);
