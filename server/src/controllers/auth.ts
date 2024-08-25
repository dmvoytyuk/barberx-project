import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';

import { addCookies } from '../utils/handleCookies/addCookies.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';
import type { IAuthRequest } from '../@types/Request.ts';

export const registerController: Controller = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};

export const loginController: Controller = async (req, res) => {
  const session = await loginUser(req.body);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: session.accessToken,
  });
};

export const currentUserController: Controller = async (
  req: IAuthRequest,
  res
) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: req.user,
  });
};

export const logoutController: Controller = async (req, res) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
    removeCookies(res);
    res.status(204).send({ status: 204, message: 'Successfully logged out' });
    return;
  }

  removeCookies(res);
  res.status(204).send();
};
