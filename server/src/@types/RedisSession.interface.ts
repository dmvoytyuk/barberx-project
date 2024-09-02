import type { Entity } from 'redis-om';

export interface RedisSession extends Entity {
  user?: {
    _id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    favorites: string[];
    liked: string[];
    disliked: string[];
  };
  auth?: { accessToken: string; accessTokenValidUntil: string };
}
