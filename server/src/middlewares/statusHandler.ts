import type { Controller } from '../@types/Controller.type.ts';

export const statusHandler: Controller = (_req, res, _next) => {
  res.status(200).send('Server is running');
};
