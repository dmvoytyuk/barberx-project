import { Repository } from 'redis-om';

import redisClient from './client.ts';
import redisSchema from './schema.ts';

import type { IRedisSession } from '../@types/IRedisSession.interface.ts';

const repository = new Repository<IRedisSession>(redisSchema, redisClient);

export default repository;
