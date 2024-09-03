import { EntityId } from 'redis-om';
import createHttpError from 'http-errors';

import { Cookie } from '../../@types/enums/Cookie.enum.ts';
import type { Repository } from 'redis-om';
import type { NextFunction, Request, Response } from 'express';
import type { IRedisSession } from '../../@types/IRedisSession.interface.ts';
import type {
  ISession,
  SessionAuth,
  SessionOptions,
  SessionUser,
} from '../../@types/ISession.interface.ts';

import repository from '../../redis/repository.ts';
import { FIFTEEN_MINUTES, ONE_MONTH } from '../../constants/index.ts';
import { randomBytes } from 'crypto';
import validateSession from './validateSession.ts';

export class Session implements ISession {
  readonly #repository: Repository<IRedisSession>;
  #req: Request;
  #res: Response;
  #next: NextFunction;

  #prevId: string | null;
  #prevSession: IRedisSession = { user: {}, auth: {} };
  #options: SessionOptions;

  auth: SessionAuth;
  user: SessionUser;

  constructor(
    req: Request,
    res: Response,
    next: NextFunction,
    session: IRedisSession | null,
    options: SessionOptions = {}
  ) {
    this.#repository = repository;
    this.#req = req;
    this.#res = res;
    this.#next = next;

    this.#prevId = session?.[EntityId] ?? null;
    this.#prevSession = session ?? this.#prevSession;
    this.#options = {
      sessionTTL: ONE_MONTH / 1000,
      accessTokenMaxAge: FIFTEEN_MINUTES,
      ...options,
    };
    console.log(session);
    this.auth = session?.auth ?? this.#prevSession.auth;
    this.user = session?.user ?? this.#prevSession.user;
  }

  #setupSessionAuth(): SessionAuth {
    const accessToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date(
      Date.now() + this.#options.accessTokenMaxAge!
    );
    return {
      accessToken,
      accessTokenValidUntil,
    };
  }

  async #saveSession(session: IRedisSession) {
    try {
      const savedSession = await this.#repository.save(session);
      const sessionId = savedSession[EntityId]!;

      await this.#repository.expire(sessionId, this.#options.sessionTTL!);

      this.#res.cookie(Cookie.sessionId, sessionId, {
        path: '/',
        maxAge: this.#options.sessionTTL! * 1000,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async login() {
    this.auth = this.#setupSessionAuth();

    let session = {
      auth: this.auth,
      user: this.user,
    };

    if (!this.#prevId) session = { ...this.#prevSession, auth: this.auth };

    await this.#saveSession(session);
  }

  async refresh() {
    const { authHeader, isBearer, isMatch } = validateSession(this.#req);

    if (!authHeader || !isBearer || !isMatch) {
      this.#next(
        createHttpError(401, 'Invalid or missing Authorization header')
      );
      return;
    }

    this.auth = this.#setupSessionAuth();

    const session = {
      ...this.#prevSession,
      auth: this.auth,
    };

    this.#res.clearCookie(Cookie.sessionId);
    await this.#saveSession(session);
  }

  async logout() {
    if (this.#prevId) {
      await repository.remove(this.#prevId);
      this.#prevId = null;
      this.auth = {};
      this.user = {};
      this.#res.clearCookie(Cookie.sessionId);
    }
  }
}
