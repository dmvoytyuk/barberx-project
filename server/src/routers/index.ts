import { Router } from 'express';

import authRouter from './auth.ts';
import userRouter from './user.ts';

import statusHandler from '../handlers/statusHandler.ts';
import notFoundHandler from '../handlers/notFoundHandler.ts';
import errorHandler from '../handlers/errorHandler.ts';

const router = Router();

router.get('/status', statusHandler);

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/*', notFoundHandler);
router.use(errorHandler);

export default router;
