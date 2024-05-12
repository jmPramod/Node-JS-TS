import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDataBase } from '../src/config/connectDb';
import { authRoute } from './routes/auth.routes';
dotenv.config();

const app = express();
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authRoute);
interface CustomError extends Error {
  status?: number;
  stack?: string;
}
app.use(
  (
    err: CustomError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Something went wrong!!!!';

    return res.status(500).json({
      statusCode: statusCode,
      data: null,
      error: errorMessage,
      message: '',
      stacks: err.stack,
    });
  }
);
connectDataBase();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT http://localhost:${process.env.PORT}`);
});
