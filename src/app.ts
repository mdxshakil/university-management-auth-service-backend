import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Application routes
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  // throw new Error("Ore baba error")
  // throw new ApiError(400, "Ore baba error")
  // next("Ore baba error")
});

// global error handler
app.use(globalErrorHandler);

export default app;
