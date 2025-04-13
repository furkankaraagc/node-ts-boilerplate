import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';

import { verifyUser } from '@/middleware/verify-user';
import userRouter from '@/modules/user/user.router';
import { corsConfig } from '@/utils/cors-config';

const app = express();

const PORT = 8000;

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

app.get('/api/protected', verifyUser, (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
