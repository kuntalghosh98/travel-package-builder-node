import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/index.js';
import { config } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();

const corsOptions = config.clientOrigin
  ? { origin: config.clientOrigin.split(',').map(origin => origin.trim()) }
  : {};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

app.use('/api', apiRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
