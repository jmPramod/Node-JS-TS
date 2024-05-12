import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_url);
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB database');
    });

    db.once('disconnected', () => {
      console.log('Disconnected from MongoDB database');
    });
  } catch (error) {}
};
