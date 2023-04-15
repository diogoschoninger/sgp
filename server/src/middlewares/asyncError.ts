import { Request, Response, NextFunction } from 'express';

export default (handler: any) =>
  (req: Request, res: Response, next: NextFunction) =>
    handler(req, res).catch(next);
