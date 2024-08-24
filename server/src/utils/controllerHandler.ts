import { RequestHandler } from 'express';
import { Controller } from '../@types/Controller.ts';

export const controllerHandler = (controller: Controller): RequestHandler => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
