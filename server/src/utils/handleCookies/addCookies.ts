import { Response } from 'express';
import { UserSession } from '../../@types/Session.ts';
import { ONE_MONTH } from '../../constants/index.ts';

export const addCookies = (res: Response, session: UserSession): void => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};
