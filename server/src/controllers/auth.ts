import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';

import { addCookies } from '../utils/handleCookies/addCookies.ts';
import { removeCookies } from '../utils/handleCookies/removeCookies.ts';
import type { User } from '../@types/User.ts';

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

// export const currentUserController: Controller = async (req, res) => {
//   const { userId } = req.body;
//   // if (!req.user) {
//   if (!userId) {
//     res.status(400).json({ status: 400, message: 'Please, provide user id' });
//     return;
//   }

//   // const currentUser = await getUser(req.user._id);
//   const currentUser: User | null = await getUser(userId);

//   if (!currentUser) {
//     res.status(404).json({ status: 404, message: 'User not found' });
//     return;
//   }

//   res.status(200).json({
//     status: 200,
//     message: 'Successfully retrieved data',
//     data: currentUser,
//   });
// };

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
