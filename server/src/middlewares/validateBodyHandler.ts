// import { NextFunction, Request, Response } from 'express';
// import createHttpError from 'http-errors';

// export const validateBodyHandler =
//   (schema) => async (req: Request, _: Response, next: NextFunction) => {
//     try {
//       await schema.validateAsync(req.body, { abortEarly: false });
//       next();
//     } catch (err: any) {
//       const error = createHttpError(400, 'Bad Request', {
//         errors: err.details,
//       });
//       next(error);
//     }
//   };
