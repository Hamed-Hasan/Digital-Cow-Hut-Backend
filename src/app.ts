import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import httpStatus from 'http-status';
// import router from './models/user/userRoutes';
import { errorMiddleware } from './middlewares/errorMiddleware';
import router from './routes';
// Load environment variables from .env file
dotenv.config();
const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', router);

// Global error handling middleware
app.use(errorMiddleware);
  
  

//handle not found route for 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Not Found',
      errorMessages: [
        {
          path: req.originalUrl,
          message: 'API Not Found',
        },
      ],
    });
  });

export default app;
