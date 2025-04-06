import { Router } from 'express';

import { loginHandler, refreshTokenHandler } from '@/modules/user/user.controller';

const userRouter = Router();

userRouter.post('/api/login', loginHandler);
userRouter.post('/api/refresh', refreshTokenHandler);
export default userRouter;
