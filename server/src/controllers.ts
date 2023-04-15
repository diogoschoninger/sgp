import { Request, Response } from 'express';

import { User } from './models';
import { ConflictError } from './utils/errors';
import asyncErrorHandler from './middlewares/asyncError';
import { encrypt } from './utils/auth';

const controller = {
  publicRoute: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello. This endpoint is public.' });
  },

  register: asyncErrorHandler(async (req: Request, res: Response) => {
    const user = {
      ...req.body,
      password: await encrypt(req.body.password),
    };

    const insertedFull = await User.create(user);

    if (!insertedFull)
      return Promise.reject(
        new ConflictError(`User with email '${user.email}' already registered`)
      );

    const { password, ...inserted }: any = insertedFull;

    res.status(201).send(inserted.dataValues);
  }),

  login: asyncErrorHandler(async (req: Request, res: Response) => {
    let user;

    const { email, _password } = req.body;

    User.findOne({
      where: { email },
    }).then(console.log);

    res.send();
  }),

  hello: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Haha, private route working here' });
  },
};

export default controller;
