import userService from '../services/auth.ts';
import createHttpError from 'http-errors';

import type { Controller } from '../@types/Controller.type.ts';
import { Cookie } from '../@types/enums/Cookie.enum.ts';

import createSession from '../utils/createSession.ts';
import testToken from '../utils/testToken.ts';

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
  const { accessToken, accessTokenValidUntil } = createSession();

  req.session.user = user;
  req.session.auth = {
    accessToken,
    accessTokenValidUntil,
  };

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: req.session.auth.accessToken,
  });
};

const logout: Controller = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);

    res.clearCookie(Cookie.sessionId, { path: '/' });
    res.redirect(200, '/');
  });
};

const refresh: Controller = async (req, res, next) => {
  if (!req.session.auth || !req.session.user) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }
  const user = req.session.user;

  const { authHeader, isBearer, isMatch } = testToken(req);

  if (!authHeader) {
    next(createHttpError(401, 'Provide Authorization header'));
    return;
  }

  if (!isBearer) {
    next(createHttpError(401, 'Access token must be of type Bearer'));
    return;
  }

  if (!isMatch) {
    next(createHttpError(401, 'Access token damaged or invalid'));
    return;
  }

  req.session.regenerate((err) => {
    if (err) next(err);

    const { accessToken, accessTokenValidUntil } = createSession();

    req.session.user = user;
    req.session.auth = {
      accessToken,
      accessTokenValidUntil,
    };

    res.status(200).json({
      status: 200,
      message: 'User session has been refreshed',
      data: accessToken,
    });
  });
};

export default { register, login, logout, refresh };
