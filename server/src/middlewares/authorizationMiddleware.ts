import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.ts';
import type { UserSession } from '../@types/Session.ts';

import { Sessions } from '../db/models/session.ts';
import { Users } from '../db/models/user.ts';
import type { IAuthRequest } from '../@types/Request.ts';
import type { User } from '../@types/User.ts';
import type { Request } from 'express';

export const authorizationMiddleware: Controller = async (
  req: Request,
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

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(
      createHttpError(
        401,
        'Provided access token expired, please refresh or log in again'
      )
    );
  }

  const user: User = (await Users.findOne({ _id: session.userId }))!;

  (req as IAuthRequest).user = user;

  next();
};
