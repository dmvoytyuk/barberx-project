import RedisStore from 'connect-redis';
import session from 'express-session';
import { createClient } from 'redis';

import { Cookie } from '../@types/enums/Cookie.enum.ts';

import { ONE_MONTH } from '../constants/index.ts';

const redis = createClient({ url: 'redis://localhost:6379' });
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
