import createHttpError from 'http-errors';
import type { Controller } from '../@types/Controller.ts';
import { Sessions } from '../db/models/session.ts';
import type { UserSession } from '../@types/Session.ts';

export const authorizationMiddleware: Controller = async (req, res, next) => {
  const authHeader: string | undefined = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please, provide Authorization header'));
    return;
  }

  const [bearer, accessToken] = authHeader?.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Authorization header must be of type Bearer'));
    return;
  }

  const session: UserSession | null = await Sessions.findOne({ accessToken });
  if (!session) {
    next(createHttpError(401, 'Session not found. Please, log in again'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
  }
};
