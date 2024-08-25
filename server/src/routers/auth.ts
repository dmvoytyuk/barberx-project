import { Router } from 'express';
import {
  loginController,
  logoutController,
  registerController,
} from '../controllers/auth.ts';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.ts';

export const authRouter: Router = Router();

authRouter.post('/register', controllerHandler(registerController));
authRouter.post('/login', controllerHandler(loginController));
authRouter.post('/logout', controllerHandler(logoutController));
// authRouter.post('/refresh', authorizationMiddleware, controllerHandler());
