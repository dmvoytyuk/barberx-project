import { Request, Response } from 'express';

import { getUser, loginUser, registerUser } from '../services/auth.ts';
import { addCookies } from '../utils/addCookies.ts';
import { IAuthRequest } from '../@types/Request.ts';

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
  const currentUser = await getUser(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved a user',
    data: currentUser,
  });
};
