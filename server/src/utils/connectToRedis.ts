import { redis } from '../redis/client.ts';
import { prefetchSessions } from '../redis/prefetchSessions.ts';

export const connectToRedis = async () => {
  await redis.connect();
  await prefetchSessions();
};
