import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.type.ts';

import validateSession from './sessionHandler/validateSession.ts';
import { Token } from '../@types/enums/Token.enum.ts';

const authentication: Controller = async (req, _res, next) => {
  const auth = req.session.auth;
  if (
    !auth.hasOwnProperty(Token.accessToken) ||
    !auth.hasOwnProperty(Token.accessTokenValidUntil)
  ) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const { authHeader, isBearer, isMatch, isExpired } = validateSession(req);

  if (!authHeader) {
    next(createHttpError(401, 'Provide Authorization header'));
    return;
  }

  if (!isBearer) {
    next(createHttpError(401, 'Access token must be of type Bearer'));
    return;
  }

  if (!isMatch) {
    next(createHttpError(401, 'Access token damaged or invalid'));
    return;
  }

  if (isExpired) {
    next(createHttpError(401, 'Access token expired. Please, refresh'));
    return;
  }

  next();
};

export default authentication;
