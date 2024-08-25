import type { Controller } from '../@types/Controller.ts';
import { ObjectSchema, ValidationError } from 'joi';
import createHttpError from 'http-errors';

export const validationHandler =
  (schema: ObjectSchema): Controller =>
  async (req, _, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      if (err instanceof ValidationError) {
        next(
          createHttpError(400, 'Bad Request', {
            errors: err.details,
          })
        );
      } else {
        next(err);
      }
    }
  };
