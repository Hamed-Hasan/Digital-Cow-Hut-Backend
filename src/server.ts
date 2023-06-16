import app from './app';
import mongoose from 'mongoose';
import { DATABASE_URL, PORT } from '../config';

async function dataBase() {
  try {
    await mongoose.connect(DATABASE_URL as string);
    console.log(`🛢 Database is connected successfully`);

    const server = app.listen(PORT, () => {
      console.log(`Application listening on port ${PORT}`);
    });
  } catch (err) {
    console.log('Failed to connect to the database', err);
  }
}

dataBase();
