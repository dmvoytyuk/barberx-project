import type { Controller } from '../@types/Controller.ts';

export const currentUserController: Controller = async (req, res, _next) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: req.app.locals.user,
  });
};

export const updateUserController: Controller = async (req, res, _next) => {};
