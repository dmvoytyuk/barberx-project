import { Request, RequestHandler, Response } from 'express';

import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.ts';
import { addCookies } from '../utils/handleCookies/addCookies.ts';
import { IAuthRequest } from '../@types/Request.ts';
import { ObjectId } from 'mongoose';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';

export const registerController = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered new user',
    data: user,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const session = await loginUser(req.body);

  addCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user',
    data: session.accessToken,
  });
};

export const currentUserController = async (
  req: IAuthRequest,
  res: Response
) => {
  // if (!req.user) {
  if (!req.body.user) {
    res.status(404).json({ status: 404, message: 'User not found' });
    return;
  }

  // const currentUser = await getUser(req.user._id);
  const currentUser = await getUser(req.body.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved a user',
    data: currentUser,
  });
};

export const logoutController = async (req: Request, res: Response) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId) {
    await logoutUser(sessionId);
  }

  removeCookies(res);

  res.status(204).send({ status: 204, message: 'Successfully logged out' });
};
