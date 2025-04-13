import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '@/middleware/async-handler';
// refresh token doğrulama için gerekli olabilir
import { signJWT, verifyJWT } from '@/utils/jwt';

export const verifyUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['accessToken'];
  const refreshToken = req.cookies['refreshToken'];

  if (accessToken) {
    const { payload, expired } = verifyJWT(accessToken);
    if (!expired && payload) {
      const { exp, iat, ...safePayload } = payload as any;
      // @ts-ignore
      req.user = safePayload;
      return next();
    }
  }

  if (refreshToken) {
    const { payload: refreshPayload, expired: refreshExpired } = verifyJWT(refreshToken);
    if (refreshPayload && !refreshExpired) {
      const user = refreshPayload as any;
      // const userId = (refreshPayload as any).userId;
      // const user = await findUserById(userId); // refresh token ile kullanıcıyı bul

      // if (!user) {
      //   return res.status(401).json({ message: 'Invalid refresh token' });
      // }

      const newAccessToken = signJWT({ email: user.email, username: user.username }, 60 * 5); // 5 minutes

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        // sameSite: 'lax',
        // sameSite: 'strict',
      });

      const { exp, iat, ...safePayload } = verifyJWT(newAccessToken).payload as any;
      // @ts-ignore
      req.user = safePayload;
      return next();
    }
  }

  // Eğer buraya kadar geldiyse tokenlar geçersiz
  return res.status(401).json({ message: 'Unauthorized' });
});
