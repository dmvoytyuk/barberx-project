import { Router } from 'express';
import {
  currentUserController,
  loginController,
  registerController,
} from '../controllers/auth.ts';

export const authRouter: Router = Router();

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
// authRouter.get('/user', currentUserController);
