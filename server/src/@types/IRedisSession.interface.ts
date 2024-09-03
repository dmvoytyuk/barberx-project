import type { Entity } from 'redis-om';
import type { SessionAuth, SessionUser } from './ISession.interface.ts';

export interface IRedisSession extends Entity {
  user: SessionUser;
  auth: SessionAuth;
}
