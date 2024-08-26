import { Router } from 'express';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import {
  currentUserController,
  updateUserController,
} from '../controllers/user.ts';
import { authorizationMiddleware } from '../middlewares/authorizationMiddleware.ts';
import { validationHandler } from '../middlewares/validationHandler.ts';
import { updateUserSchema } from '../validation/user.ts';

export const userRouter = Router();

userRouter.get(
  '/current',
  authorizationMiddleware,
  controllerHandler(currentUserController)
);

userRouter.patch(
  '/update',
  validationHandler(updateUserSchema),
  controllerHandler(updateUserController)
);
