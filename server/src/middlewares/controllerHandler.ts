import type { Controller } from '../@types/Controller.type.ts';

export const controllerHandler = (controller: Controller): Controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
