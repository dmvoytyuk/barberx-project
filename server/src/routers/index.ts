import { Router } from 'express';

import { authRouter } from './auth.ts';
import { statusHandler } from '../middlewares/statusHandler.ts';
import { notFoundHandler } from '../middlewares/notFoundHandler.ts';
import { errorHandler } from '../middlewares/errorHandler.ts';
import { userRouter } from './user.ts';

export const router = Router();

router.get('/', statusHandler);

router.use('/auth', authRouter);
router.use('/user', userRouter);

router.use('/*', notFoundHandler);
router.use(errorHandler);
