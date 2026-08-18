import mongoose from 'mongoose';
import { config } from './index.js';

export async function connectDB() {
  if (!config.mongodbUri) {
    throw new Error('MONGODB_URI is required');
  }

  try {
    await mongoose.connect(config.mongodbUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
}
