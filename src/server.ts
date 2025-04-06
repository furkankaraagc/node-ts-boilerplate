import express, { Request, Response } from 'express';
import cors from 'cors';
import { corsConfig } from './utils/cors-config';
import cookieParser from 'cookie-parser';
import { verifyUser } from './middleware/verify-user';
import userRouter from './modules/user/user.router';

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
