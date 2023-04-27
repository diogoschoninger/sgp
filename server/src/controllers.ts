import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';

import db from './db/config';
import asyncErrorHandler from './middlewares/asyncError';
import { encrypt, jwtConfig } from './utils/auth';
import { AuthenticationError } from './utils/errors';
import safeCompare from './utils/safeCompare';

const controller = {
  // SESSÃO
  register: asyncErrorHandler(async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: await encrypt(req.body.password),
    };

    await db.query(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      {
        replacements: [user.name, user.email, user.password],
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).send({ message: 'Created' });
  }),

  login: asyncErrorHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const [user, _metadata]: any = await db.query(
      `SELECT * FROM users WHERE email LIKE "${email}"`
    );
    if (user.length < 1) throw new AuthenticationError('Invalid credentials');

    const encrypted = await encrypt(password);
    const isValid = await safeCompare(encrypted, user[0].password);

    if (!isValid) throw new AuthenticationError('Invalid credentials');

    const token = jwt.sign(user[0], jwtConfig.secret as Secret, {
      expiresIn: jwtConfig.expiration,
    });

    res.status(200).send({ token, user });
  }),
};

export default controller;
