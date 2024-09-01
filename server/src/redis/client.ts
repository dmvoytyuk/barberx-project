import { createClient } from 'redis';

export const redis = createClient({ url: 'redis://localhost:6379' });
redis.on('connect', () => {
  console.log('Redis Client connected');
});
redis.on('error', (err) => console.log('Redis Client Error', err));

redis.connect();
