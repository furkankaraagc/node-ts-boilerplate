import { NextFunction, Request, Response } from 'express';

import { verifyJWT } from '@/utils/jwt';

export const verifyUser = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { payload, expired } = verifyJWT(token);
  if (expired) {
    res.status(401).json({ message: 'Token expired' });
    return;
  }

  if (payload) {
    // @ts-ignore
    req.user = payload;
    next(); //
    return;
  }

  res.status(401).json({ message: 'Invalid token' });
};
