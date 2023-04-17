import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

import asyncErrorHandler from './middlewares/asyncError';
import { User } from './models';
import { encrypt, jwtConfig } from './utils/auth';
import { AuthenticationError, ConflictError } from './utils/errors';
import safeCompare from './utils/safeCompare';

const controller = {
  publicRoute: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello. This endpoint is public.' });
  },

  register: asyncErrorHandler(async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: await encrypt(req.body.password),
    };

    User.create(user)
      .then((response) => res.status(201).send(response))
      .catch((error) => {
        switch (error) {
          case 'SequelizeUniqueConstraintError':
            throw new ConflictError(error.errors[0].message);
          default:
            throw new Error('Internal error');
        }
      });
  }),

  login: asyncErrorHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const {
      password: userPassword,
      id,
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

  hello: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Haha, private route working here' });
  },
};

export default controller;
