import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';

import env from '../utils/env.ts';
import { ENV_VARS } from '../@types/enums/ENV.enum.ts';
import { Cookie } from '../@types/enums/Cookie.enum.ts';

import { ONE_MONTH } from '../constants/index.ts';

const redisUrl = env(ENV_VARS.REDIS_URL);

const redis = createClient({ url: redisUrl });
redis.on('connect', () => {
  console.log('Redis Client connected');
});
redis.on('error', (err) => console.log('Redis Client Error', err));
redis.connect();

const redisStore = new RedisStore({
  client: redis,
  prefix: 'UserSessions:',
  disableTouch: true,
});

const sessionHandler = session({
  store: redisStore,
  secret: 'YetAnotherSuperSecretUkrainianSecret',
  saveUninitialized: false,
  name: Cookie.sessionId,
  resave: false,
  rolling: true,
  cookie: { secure: false, httpOnly: true, maxAge: ONE_MONTH },
});

export default sessionHandler;
