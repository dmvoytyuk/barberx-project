import { Response } from 'express';

export const removeCookies = (res: Response): void => {
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');
};
