import { Schema } from 'redis-om';
import type { RedisSession } from '../@types/RedisSession.interface.ts';

const redisSessionSchema = new Schema<RedisSession>(
  'session',
  {
    _id: { type: 'string', path: '$.user._id' },
    name: { type: 'string', path: '$.user.name' },
    email: { type: 'string', path: '$.user.email' },
    phone: { type: 'string', path: '$.user.email' },
    role: { type: 'string', path: '$.user.role' },
    favorites: { type: 'string[]', path: '$.user.favorites' },
    liked: { type: 'string[]', path: '$.user.liked' },
    disliked: { type: 'string[]', path: '$.user.disliked' },
    accessToken: { type: 'string', path: '$.auth.accessToken' },
    accessTokenValidUntil: {
      type: 'date',
      path: '$.auth.accessTokenValidUntil',
    },
  },
  { dataStructure: 'JSON' }
);

export default redisSessionSchema;
