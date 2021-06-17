import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((error: Error, request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: 'error',
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    error: 'error',
    message: 'Internal server error',
  });
});

app.listen(4000, () => {
  console.log('🔥 Listening at port 4000!');
});
