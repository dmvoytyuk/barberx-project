import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.ts';
import type { UserSession } from '../@types/Session.ts';

import { Sessions } from '../db/models/session.ts';
import { Users } from '../db/models/user.ts';
import type { IAuthRequest } from '../@types/Request.ts';
import type { User } from '../@types/User.ts';
import type { Request, Response } from 'express';
import { logoutUser } from '../services/auth.ts';

export const authorizationMiddleware: Controller<Request, Response> = async (
  req,
  _,
  next
) => {
  const authHeader: string | undefined = req.get('Authorization');
  if (!authHeader) {
    next(createHttpError(401, 'Please, provide Authorization header'));
    return;
  }

  const [bearer, accessToken] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !accessToken) {
    next(createHttpError(401, 'Authorization header must be of type Bearer'));
    return;
  }

  const session: UserSession | null = await Sessions.findOne({ accessToken });
  if (!session) {
    next(createHttpError(401, 'Session not found. Please, log in again'));
    return;
  }

  const user: User | null = await Users.findOne({ _id: session.userId });
  if (!user) {
    await logoutUser(session._id);
    next(createHttpError(400, 'Please, log in first'));
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

  (req as IAuthRequest).user = user;

  next();
};
