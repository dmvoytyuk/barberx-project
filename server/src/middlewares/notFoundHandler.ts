import type { Controller } from '../@types/Controller.ts';

export const notFoundHandler: Controller = (_req, res, _next) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
