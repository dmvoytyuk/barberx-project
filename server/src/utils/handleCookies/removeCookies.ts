import { Response } from 'express';
import { Token } from '../../@types/Session.ts';

export const removeCookies = (res: Response): void => {
  res.clearCookie(Token.sessionId);
  res.clearCookie(Token.refreshToken);
};
