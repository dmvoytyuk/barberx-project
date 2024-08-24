import { Router } from 'express';
import {
  currentUserController,
  loginController,
  logoutController,
  registerController,
} from '../controllers/auth.ts';
import { controllerHandler } from '../utils/controllerHandler.ts';

export const authRouter: Router = Router();

authRouter.post('/register', controllerHandler(registerController));
authRouter.post('/login', controllerHandler(loginController));
authRouter.post('/logout', controllerHandler(logoutController));
authRouter.get('/user', controllerHandler(currentUserController));
