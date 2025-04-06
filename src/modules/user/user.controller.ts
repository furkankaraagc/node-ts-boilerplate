import { mockUsers } from '@/constants/mockData';
import { signJWT, verifyJWT } from '@/utils/jwt';
import { Request, Response } from 'express';

export const loginHandler = (req: Request, res: Response) => {
  // const params = req.params;
  // const query = req.query;
  const body = req.body;

  const user = mockUsers.find(
    (user) => user.username === body.username && user.password === body.password,
  );

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { password, ...safeUser } = user;

  const accessToken = signJWT(safeUser, 60 * 5); // 5 minutes
  const refreshToken = signJWT(safeUser, 60 * 60 * 24 * 7); // 7 days

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.json({ accessToken });
};
export const refreshTokenHandler = (req: Request, res: Response) => {
  const token = req.cookies['refreshToken'];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { payload, expired } = verifyJWT(token);

  if (expired || !payload) {
    res.status(403).json({ message: 'Token expired' });
    return;
  }
  const { exp, iat, ...safePayload } = payload as any;

  const accessToken = signJWT(safePayload, 60 * 5); // 5 minutes

  res.status(200).json({ accessToken });
};
