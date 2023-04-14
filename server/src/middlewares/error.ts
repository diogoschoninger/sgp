import { NextFunction, Request, Response } from 'express';

import { ValidationError } from '../utils/errors';

const responseMappers: any = {
  ValidationError: (error: any) => ({
    status: 400,
    body: {
      statusCode: 400,
      error: ValidationError.name,
      message: error.message,
      cause: error.validations ?? [],
    },
  }),

  default: (error: any) => ({
    status: 500,
    body: {
      statusCode: 500,
      error: error.name ?? 'UnexpectedError',
      message: error.message,
      cause: [],
    },
  }),
};

export default () =>
  (error: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(error);

    const mapper = responseMappers[error.name] ?? responseMappers.default;

    const { status, body } = mapper(error);

    res.status(status).send(body);
  };
