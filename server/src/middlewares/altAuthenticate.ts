import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.type.ts';
import { testToken } from '../utils/testToken.ts';

export const alternativeAuthenticate: Controller = async (req, _res, next) => {
  if (!req.session.auth) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const { authHeader, isBearer, isMatch, isExpired } = testToken(req);

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
