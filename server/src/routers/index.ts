import { Router } from 'express';

import { authRouter } from './auth.ts';
import { statusHandler } from '../middlewares/statusHandler.ts';
import { notFoundHandler } from '../middlewares/notFoundHandler.ts';
import { errorHandler } from '../middlewares/errorHandler.ts';

export const router = Router();

router.get('/', statusHandler);
router.use('/auth', authRouter);
router.use('*', notFoundHandler);
router.use(errorHandler);
