import { Router } from 'express';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import {
  currentUserController,
  updateUserController,
} from '../controllers/user.ts';
import { authenticationMiddleware } from '../middlewares/authenticationMiddleware.ts';
import { validationHandler } from '../middlewares/validationHandler.ts';
import { updateUserSchema } from '../validation/user.ts';

export const userRouter = Router();

userRouter.get(
  '/current',
  authenticationMiddleware,
  controllerHandler(currentUserController)
);

userRouter.patch(
  '/update',
  validationHandler(updateUserSchema),
  controllerHandler(updateUserController)
);
