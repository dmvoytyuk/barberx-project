import { loginUser, refreshSession, registerUser } from '../services/auth.ts';

import type { Controller } from '../@types/Controller.type.ts';

import { createSession } from '../utils/createSession.ts';
import { Cookie } from '../@types/enums/Cookie.enum.ts';
import { TokenType } from '../@types/enums/Token.enum.ts';
import createHttpError from 'http-errors';
import { testToken } from '../utils/testToken.ts';

export const registerController: Controller = async (req, res, _next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};

export const loginController: Controller = async (req, res, _next) => {
  const user = await loginUser(req.body);

  req.session.auth = {
    accessToken: createSession(user._id).accessToken,
    accessTokenValidUntil: createSession(user._id).accessTokenValidUntil,
  };
  req.session.user = user;

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in',
    data: req.session.auth.accessToken,
  });
};

export const logoutController: Controller = async (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    }
    res.clearCookie(Cookie.sessionId, { path: '/' });
    res.redirect(200, '/');
  });
};

export const refreshController: Controller = async (req, res, next) => {
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

    req.session.auth = {
      accessToken: createSession(user._id).accessToken,
      accessTokenValidUntil: createSession(user._id).accessTokenValidUntil,
    };

    req.session.user = user;

    res.status(200).json({
      status: 200,
      message: 'User session has been refreshed',
      data: req.session.auth.accessToken,
    });
  });
};
