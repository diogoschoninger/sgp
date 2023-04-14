import { Request, Response } from 'express';

const controller = {
  publicRoute: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello. This endpoint is public.' });
  },

  register: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Register route' });
  },

  login: (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Login route' });
  },
};

export default controller;
