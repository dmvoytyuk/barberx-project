import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.ts';

import { Session } from '../db/models/session.ts';
import { User } from '../db/models/user.ts';
import { logoutUser } from '../services/auth.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';

export const authorizationMiddleware: Controller = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return next(createHttpError(401, 'Please, provide Authorization header'));
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    return next(
      createHttpError(401, 'Authorization header must be of type Bearer')
    );
  }

  const session = await Session.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found. Please, log in'));
  }

  const user = await User.findOne({ _id: session.userId });
  if (!user) {
    await logoutUser(session._id);
    removeCookies(res);
    return next(createHttpError(400, 'Please, log in'));
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    return next(
      createHttpError(
        401,
        'Access token expired, please refresh or log in again'
      )
    );
  }

  req.app.locals.user = user.toObject();

  next();
};
