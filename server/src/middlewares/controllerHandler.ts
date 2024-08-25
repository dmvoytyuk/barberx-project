import type { Controller } from '../@types/Controller.ts';
import type { Response } from 'express';

export const controllerHandler = (
  controller: Controller<any, Response>
): Controller<any, Response> => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
