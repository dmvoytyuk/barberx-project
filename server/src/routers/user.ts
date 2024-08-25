import { Router } from 'express';

import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.ts';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import { currentUserController } from '../controllers/user.ts';

export const userRouter = Router();

userRouter.get(
  '/current',
  authorizationMiddleware,
  controllerHandler(currentUserController)
);
