import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

const validate =
  ({
    body: bodySchema = Joi.any(),
    params: paramsSchema = Joi.any(),
    query: querySchema = Joi.any(),
  }) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const { body, params, query } = req;

    const schema = Joi.object({
      body: bodySchema,
      params: paramsSchema,
      query: querySchema,
    });

    const { error } = schema.validate(
      { body, params, query },
      { abortEarly: false }
    );

    if (!error) {
      next();
      return;
    }

    next('Erro de validação');
  };

export default validate;
