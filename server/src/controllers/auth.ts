import { loginUser, logoutUser, registerUser } from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';
import type { Request, Response } from 'express';

import { addCookies } from '../utils/handleCookies/addCookies.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';

export const registerController: Controller<Request, Response> = async (
  req,
  res
) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};

export const loginController: Controller<Request, Response> = async (
  req,
  res
) => {
  const session = await loginUser(req.body);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: session.accessToken,
  });
};

export const logoutController: Controller<Request, Response> = async (
  req,
  res
) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
    removeCookies(res);

    res.status(204).send({ status: 204, message: 'Successfully logged out' });
  }

  removeCookies(res);
  res.status(204).send();
};
