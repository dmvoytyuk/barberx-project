import userService from '../services/auth.ts';
import createHttpError from 'http-errors';

import { Token } from '../@types/enums/Token.enum.ts';
import type { Controller } from '../@types/Controller.type.ts';

const register: Controller = async (req, res, _next) => {
  const user = await userService.register(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};

const login: Controller = async (req, res, _next) => {
  const user = await userService.login(req.body);

  req.session.user = user.toJSON();

  await req.session.login();

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: req.session.auth.accessToken,
  });
};

const logout: Controller = async (req, res, _next) => {
  await req.session.logout();
  res.redirect(200, '/');
};

const refresh: Controller = async (req, res, next) => {
  const auth = req.session.auth;
  if (
    !auth.hasOwnProperty(Token.accessToken) ||
    !auth.hasOwnProperty(Token.accessTokenValidUntil)
  ) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  await req.session.refresh();

  res.status(200).json({
    status: 200,
    message: 'User session has been refreshed',
    data: req.session.auth.accessToken,
  });
};

export default { register, login, logout, refresh };
