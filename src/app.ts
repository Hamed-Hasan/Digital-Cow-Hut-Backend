import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
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
  
  

export default app;
