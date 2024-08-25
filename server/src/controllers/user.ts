import type { Response } from 'express';
import type { Controller } from '../@types/Controller.ts';
import type { IAuthRequest } from '../@types/Request.ts';

export const currentUserController: Controller<IAuthRequest, Response> = async (
  req,
  res
) => {
  const { password, ...rest } = req.user;
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: rest,
  });
};
