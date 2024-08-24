import { ErrorRequestHandler, Request, Response } from 'express';
import { isHttpError } from 'http-errors';

export const errorHandler: ErrorRequestHandler = (err, _, res, _2) => {
  if (isHttpError(err)) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      data: err,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err,
  });
};
