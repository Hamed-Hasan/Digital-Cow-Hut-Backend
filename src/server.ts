import { Server } from 'http';
import app from './app';
import mongoose from 'mongoose';
import { DATABASE_URL, PORT } from '../config';

let server: Server;

async function dataBase() {
  try {
    await mongoose.connect(DATABASE_URL as string);
    console.log('🛢 Database is connected successfully');

    server = app.listen(PORT, () => {
      console.log(`Digital Cow Hut Backend on port ${PORT}`);
    });

    process.on('SIGTERM', () => {
      console.log('Received SIGTERM. Shutting down gracefully...');
      server.close(() => {
        console.log('Server closed.');
        process.exit(0);
      });
    });

    process.on('unhandledRejection', (err) => {
      console.error('Unhandled Promise Rejection:', err);
      process.exit(1);
    });

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      process.exit(1);
    });
  } catch (err) {
    console.log('Failed to connect to the database', err);
  }
}

dataBase();
