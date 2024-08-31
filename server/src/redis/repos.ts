import { Repository } from 'redis-om';

import { redisSessionSchema } from './schema.ts';
import { redis } from './client.ts';

export const sessionsRepo = new Repository(redisSessionSchema, redis);
