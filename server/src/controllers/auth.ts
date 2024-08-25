import { registerUser } from '../services/auth.ts';

import type { Controller } from '../@types/Controller.ts';

export const registerController: Controller = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered',
    data: user,
  });
};
