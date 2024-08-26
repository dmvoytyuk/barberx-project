import { Router } from 'express';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import { currentUserController } from '../controllers/user.ts';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.ts';

export const userRouter = Router();

userRouter.get(
  '/current',
  authorizationMiddleware,
  controllerHandler(currentUserController)
);
