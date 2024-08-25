import type { Controller } from '../@types/Controller.ts';

export const notFoundHandler: Controller = (_, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
