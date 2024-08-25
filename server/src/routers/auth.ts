import { Router } from 'express';
import { registerController } from '../controllers/auth.ts';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import { validationHandler } from '../middlewares/validationHandler.ts';
import { registerUserSchema } from '../validation/auth.ts';

export const authRouter: Router = Router();

authRouter.post(
  '/register',
  validationHandler(registerUserSchema),
  controllerHandler(registerController)
);
