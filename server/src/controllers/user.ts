import type { Controller } from '../@types/Controller.type.ts';

const current: Controller = async (req, res, _next) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully retrieved data',
    data: req.session.user,
  });
};

const update: Controller = async (_req, _res, _next) => {};

export default { current, update };
