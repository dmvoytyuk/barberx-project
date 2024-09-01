import type { Controller } from '../@types/Controller.type.ts';

const controllerWrapper = (controller: Controller): Controller => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export default controllerWrapper;
