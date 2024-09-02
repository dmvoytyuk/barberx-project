import { Router } from 'express';

import authentication from '../middlewares/authentication.ts';
import controllerWrapper from '../handlers/controllerWrapper.ts';
import userController from '../controllers/user.ts';
import validateBody from '../middlewares/validateBody.ts';
import validationSchema from '../validation/user.ts';

const userRouter = Router();

userRouter.get(
  '/current',
  authentication,
  controllerWrapper(userController.current)
);

userRouter.patch(
  '/update',
  authentication,
  validateBody(validationSchema.update),
  controllerWrapper(userController.update)
);

export default userRouter;
