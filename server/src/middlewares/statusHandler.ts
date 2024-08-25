import type { Controller } from '../@types/Controller.ts';

export const statusHandler: Controller = (_, res) => {
  res.status(200).send('Server is running');
};
