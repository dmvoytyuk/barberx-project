import { Response } from 'express';

import { ISession } from '../../@types/Session.interface.ts';
import { Token } from '../../@types/enums/Token.enum.ts';

import { ONE_MONTH } from '../../constants/index.ts';

export const addCookies = (res: Response, session: ISession): void => {
  res.cookie(Token.sessionId, session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
  res.cookie(Token.refreshToken, session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MONTH),
  });
};
