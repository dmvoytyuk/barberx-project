import { Router } from 'express';

import validateBody from '../middlewares/validateBody.ts';
import validationSchema from '../validation/auth.ts';
import controllerWrapper from '../handlers/controllerWrapper.ts';
import authController from '../controllers/auth.ts';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(validationSchema.register),
  controllerWrapper(authController.register)
);

authRouter.post(
  '/login',
  validateBody(validationSchema.login),
  controllerWrapper(authController.login)
);

authRouter.post('/logout', controllerWrapper(authController.logout));

authRouter.post('/refresh', controllerWrapper(authController.refresh));

export default authRouter;
