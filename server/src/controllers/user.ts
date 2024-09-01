import type { Controller } from '../@types/Controller.type.ts';

export const currentUserController: Controller = async (req, res, _next) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: req.session.user,
  });
};

export const updateUserController: Controller = async (req, res, _next) => {};
