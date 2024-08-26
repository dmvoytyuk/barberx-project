import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.ts';

import { Sessions } from '../db/models/session.ts';
import { Users } from '../db/models/user.ts';
import { logoutUser } from '../services/auth.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';

export const authorizationMiddleware: Controller = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please, provide Authorization header'));
    return;
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Authorization header must be of type Bearer'));
    return;
  }

  const session = await Sessions.findOne({ accessToken });
  if (!session) {
    next(createHttpError(401, 'Session not found. Please'));
    return;
  }

  const user = await Users.findOne({ _id: session.userId });
  if (!user) {
    await logoutUser(session._id);
    removeCookies(res);
    next(createHttpError(400, 'Please, log in'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    next(
      createHttpError(
        401,
        'Access token expired, please refresh or log in again'
      )
    );
  }

  req.app.locals.user = user.toObject();

  next();
};
