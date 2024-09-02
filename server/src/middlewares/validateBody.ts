import type { Controller } from '../@types/Controller.type.ts';
import { ObjectSchema, ValidationError } from 'joi';
import createHttpError from 'http-errors';

const validateBody =
  (schema: ObjectSchema): Controller =>
  async (req, _res, next) => {
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

export default validateBody;
