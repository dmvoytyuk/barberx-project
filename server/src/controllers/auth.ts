import {
  loginUser,
  logoutUser,
  refreshSession,
  registerUser,
} from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';
import type { ObjectId } from 'mongoose';

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
  const sessionId: ObjectId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
    removeCookies(res);
    res.status(204).send({ status: 204, message: 'Successfully logged out' });
  }

  removeCookies(res);
  res.status(204).send();
};

export const refreshController: Controller = async (req, res, _next) => {
  const { sessionId, sessionToken } = req.cookies;

  const session = await refreshSession(sessionId, sessionToken);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed user session',
    data: session.accessToken,
  });
};
