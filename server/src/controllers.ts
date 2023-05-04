import { Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { QueryTypes } from 'sequelize';

import db from './db/config';
import asyncErrorHandler from './middlewares/asyncError';
import { encrypt, jwtConfig } from './utils/auth';
import { AuthenticationError } from './utils/errors';
import safeCompare from './utils/safeCompare';
import stringToNumber from './utils/stringToNumber';

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

  // DADOS DAS MOVIMENTAÇÕES FINANCEIRAS
  listFinOperationsPayments: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const data: any = await db.query(
        'SELECT * FROM fin_operations_payments',
        { type: QueryTypes.SELECT }
      );

      res.status(200).send(data);
    }
  ),

  listFinOperationsGroups: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const data: any = await db.query('SELECT * FROM fin_operations_groups', {
        type: QueryTypes.SELECT,
      });

      res.status(200).send(data);
    }
  ),

  listFinOperationsSides: asyncErrorHandler(
    async (req: Request, res: Response) => {
      const data: any = await db.query('SELECT * FROM fin_operations_sides', {
        type: QueryTypes.SELECT,
      });

      res.status(200).send(data);
    }
  ),

  // MOVIMENTAÇÕES FINANCEIRAS
  createFinOperation: asyncErrorHandler(async (req: Request, res: Response) => {
    const body = req.body;

    body.value = stringToNumber(body.value);

    await db.query(
      `INSERT INTO fin_operations (description, value, date, user_owner, payment, \`group\`, side) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          body.description,
          body.value,
          body.date,
          body.user_owner,
          body.payment,
          body.group,
          body.side,
        ],
        type: QueryTypes.INSERT,
      }
    );

    res.status(201).send({ success: true });
  }),

  listFinOperations: asyncErrorHandler(async (req: Request, res: Response) => {
    const token = req.get('Authorization')?.split(' ')[1];
    const decoded: any = jwt.verify(
      token as string,
      jwtConfig.secret as Secret
    );
    const user_id = decoded.id;

    const data = await db.query(
      'SELECT * FROM fin_operations WHERE user_owner = ? ORDER BY date, createdAt',
      { replacements: [user_id], type: QueryTypes.SELECT }
    );

    res.status(200).send(data);
  }),
};

export default controller;
