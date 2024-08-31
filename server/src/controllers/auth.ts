import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';

import { addCookies } from '../utils/handleCookies/addCookies.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';

export const registerController: Controller = async (req, res, _next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};

export const loginController: Controller = async (req, res, _next) => {
  const session = await loginUser(req.body);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: session.accessToken,
  });
};

export const logoutController: Controller = async (req, res, _next) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
    removeCookies(res);
    res.status(204).send();
    return;
  }

  removeCookies(res);
  res.status(204).send();
};

export const refreshController: Controller = async (req, res, _next) => {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed user session',
    data: session.accessToken,
  });
};
