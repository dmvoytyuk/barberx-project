import { Router } from 'express';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers/auth.ts';

import { controllerHandler } from '../middlewares/controllerHandler.ts';
import { validationHandler } from '../middlewares/validationHandler.ts';
import { loginUserSchema, registerUserSchema } from '../validation/auth.ts';

export const authRouter = Router();

authRouter
  .post(
    '/register',
    validationHandler(registerUserSchema),
    controllerHandler(registerController)
  )
  .post(
    '/login',
    validationHandler(loginUserSchema),
    controllerHandler(loginController)
  )
  .post('/logout', controllerHandler(logoutController))
  .post('/refresh', controllerHandler(refreshController));
