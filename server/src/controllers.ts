import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import asyncErrorHandler from './middlewares/asyncError';
import {
  FinOperations,
  FinOperationsGroups,
  FinOperationsPayments,
  FinOperationsSides,
  User,
} from './models';
import { encrypt, jwtConfig } from './utils/auth';
import { AuthenticationError, ConflictError } from './utils/errors';
import safeCompare from './utils/safeCompare';

const controller = {
  // SESSÃO
  register: asyncErrorHandler(async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: await encrypt(req.body.password),
    };

    return await User.create(user)
      .then((response) => res.status(201).send(response))
      .catch((error) =>
        Promise.reject(
          error.name === 'SequelizeUniqueConstraintError'
            ? new ConflictError('This email is already in use')
            : error
        )
      );
  }),
  login: asyncErrorHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const {
      password: userPassword,
      createdAt,
      updatedAt,
      deletedAt,
      ...user
    }: any = await User.findOne({
      where: { email },
    })
      .then((response) => response?.toJSON())
      .then((response) => {
        if (!response) throw new AuthenticationError('Invalid credentials');
        return response;
      });

    if (!user) throw new AuthenticationError('Invalid credentials');

    const encrypted = await encrypt(password);
    const isValid = await safeCompare(encrypted, userPassword);

    if (!isValid) throw new AuthenticationError('Invalid credentials');

    const token = jwt.sign(user, jwtConfig.secret as Secret, {
      expiresIn: jwtConfig.expiration,
    });

    res.status(200).send({ token, user });
  }),

  // MOVIMENTAÇÕES
  createFinOperation: asyncErrorHandler(async (req: Request, res: Response) => {
    const body = req.body;

    res.status(200).send(body);
  }),

  // FORMAS DE PAGAMENTO
  listFinOperationsPayments: asyncErrorHandler(
    async (_req: Request, res: Response) => {
      FinOperationsPayments.findAll().then((response) =>
        res.status(200).send(response)
      );
    }
  ),

  // GRUPOS DE MOVIMENTAÇÕES
  listFinOperationsGroups: asyncErrorHandler(
    async (_req: Request, res: Response) => {
      FinOperationsGroups.findAll().then((response) =>
        res.status(200).send(response)
      );
    }
  ),

  // LADOS DAS MOVIMENTAÇÕES
  listFinOperationsSides: asyncErrorHandler(
    async (req: Request, res: Response) => {
      FinOperationsSides.findAll().then((response) =>
        res.status(200).send(response)
      );
    }
  ),
};

export default controller;
