import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

import { testDbConnection } from '@/db';
import { verifyUser } from '@/middleware/verify-user';
import userRouter from '@/modules/user/user.router';
import { corsConfig } from '@/utils/cors-config';

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors(corsConfig));
app.use(express.json());
app.use(cookieParser());
app.use(userRouter);

app.get('/api/protected', verifyUser, (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});

const startServer = async () => {
  await testDbConnection();
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};
startServer();
