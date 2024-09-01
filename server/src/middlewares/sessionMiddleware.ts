import RedisStore from 'connect-redis';
import session from 'express-session';

import { redis } from '../redis/client.ts';
import { FIVE_MINUTES } from '../constants/index.ts';
import { Cookie } from '../@types/enums/Cookie.enum.ts';

export const sessionMiddleware = session({
  store: new RedisStore({ client: redis, prefix: 'SID:' }),
  secret: 'YetAnotherSuperSecretUkrainianSecret',
  saveUninitialized: false,
  name: Cookie.sessionId,
  resave: false,
  rolling: true,
  cookie: { secure: false, httpOnly: true, maxAge: FIVE_MINUTES },
});
