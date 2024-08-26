import type { Controller } from '../@types/Controller.ts';
import type { IUser } from '../@types/User.ts';

export const currentUserController: Controller = async (req, res, _next) => {
  const { _id, password, ...rest } = req.app.locals.user as IUser;

  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: rest,
  });
};

export const updateUserController: Controller = async (req, res, _next) => {};
