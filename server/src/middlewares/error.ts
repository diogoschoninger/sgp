import { NextFunction, Request, Response } from 'express';

import {
  AuthenticationError,
  AuthorizationError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from '../utils/errors';

const responseMappers: any = {
  NotFoundError: (error: any) => ({
    status: 404,
    body: {
      statusCode: 404,
      error: NotFoundError.name,
      message: error.message,
      cause: [],
    },
  }),

  ValidationError: (error: any) => ({
    status: 400,
    body: {
      statusCode: 400,
      error: ValidationError.name,
      message: error.message,
      cause: error.validations ?? [],
    },
  }),

  ConflictError: (error: any) => ({
    status: 409,
    body: {
      statusCode: 409,
      error: ConflictError.name,
      message: error.message,
      cause: [],
    },
  }),

  AuthenticationError: (error: any) => ({
    status: 401,
    body: {
      statusCode: 401,
      error: AuthenticationError.name,
      message: error.message,
      cause: error.cause,
    },
  }),

  AuthorizationError: (error: any) => ({
    status: 403,
    body: {
      statusCode: 403,
      error: AuthorizationError.name,
      message: error.message,
      cause: error.cause,
    },
  }),

  UnauthorizedError: (error: any) => ({
    status: 401,
    body: {
      statusCode: 401,
      error: AuthenticationError.name,
      message: error.message,
      cause: 'Invalid token',
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
