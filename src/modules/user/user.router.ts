import { Router } from 'express';

import { verifyUser } from '@/middleware/verify-user';
import { loginHandler, meHandler, refreshTokenHandler } from '@/modules/user/user.controller';

const userRouter = Router();

userRouter.post('/api/login', loginHandler);
userRouter.post('/api/refresh', refreshTokenHandler);
userRouter.get('/api/me', verifyUser, meHandler);
export default userRouter;
