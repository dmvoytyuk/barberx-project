import type { Controller } from '../@types/Controller.type.ts';

const statusHandler: Controller = (_req, res, _next) => {
  res.status(200).send('Server is running');
};

export default statusHandler;
