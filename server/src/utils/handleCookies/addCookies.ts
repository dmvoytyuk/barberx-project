import { Response } from 'express';
import { ISession, Token } from '../../@types/Session.ts';
import { ONE_MONTH } from '../../constants/index.ts';

export const addCookies = (res: Response, session: ISession): void => {
  res.cookie(Token.sessionId, session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookie(Token.sessionToken, session.sessionToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};
