import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import invalidRouteHandler from './app/middlewares/invalidRouteHandler';
import routes from './app/routes';
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Application routes
app.use('/api/v1', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

//Invalid route handler
app.use(invalidRouteHandler);

// global error handler
app.use(globalErrorHandler);

export default app;
