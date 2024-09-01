import { Router } from 'express';
import { controllerHandler } from '../middlewares/controllerHandler.ts';
import {
  currentUserController,
  updateUserController,
} from '../controllers/user.ts';
import { validationHandler } from '../middlewares/validationHandler.ts';
import { updateUserSchema } from '../validation/user.ts';
import { alternativeAuthenticate } from '../middlewares/altAuthenticate.ts';

export const userRouter = Router();

userRouter.get(
  '/current',
  alternativeAuthenticate,
  controllerHandler(currentUserController)
);

userRouter.patch(
  '/update',
  validationHandler(updateUserSchema),
  controllerHandler(updateUserController)
);
