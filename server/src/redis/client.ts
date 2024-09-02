import { createClient } from 'redis';
import { Repository } from 'redis-om';

import redisSessionSchema from './schema.ts';
import type { RedisSession } from '../@types/RedisSession.interface.ts';

export const client = createClient({ url: 'redis://localhost:6379' });

client.on('connect', () => {
  console.log('Redis Client connected');
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();
export const repository = new Repository<RedisSession>(
  redisSessionSchema,
  client
);
const session = {};
