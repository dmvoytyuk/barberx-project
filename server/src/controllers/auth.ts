import { loginUser, registerUser } from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';
import { addCookies } from '../utils/handleCookies/addCookies.ts';

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
