import type { Controller } from '../../@types/Controller.type.ts';
import { Session } from './Session.class.ts';
import { Cookie } from '../../@types/enums/Cookie.enum.ts';
import repository from '../../redis/repository.ts';

import { FIFTEEN_MINUTES, HOUR } from '../../constants/index.ts';

const sessionHandler: Controller = async (req, res, next) => {
  const sessionId: string | undefined = req.cookies[Cookie.sessionId];
  if (!sessionId) {
    req.session = new Session(req, res, next, null, {
      sessionTTL: (24 * HOUR) / 1000,
      accessTokenMaxAge: FIFTEEN_MINUTES,
    });

    next();
    return;
  }

  try {
    const session = await repository.fetch(sessionId);
    console.log('session', session);
    req.session = new Session(req, res, next, session);

    next();
  } catch (err) {
    next(err);
  }
};

export default sessionHandler;
