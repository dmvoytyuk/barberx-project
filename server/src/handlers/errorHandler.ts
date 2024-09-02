import { isHttpError } from 'http-errors';

import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (isHttpError(err)) {
    res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err,
  });
};

export default errorHandler;
