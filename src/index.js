import './config/loadEnv.js';
import app from './app.js';
import { config } from './config/index.js';
import { connectDB } from './config/db.js';

async function start() {
  await connectDB();

  app.listen(config.port, () => {
    console.log(`[${config.nodeEnv}] API running at ${config.apiUrl}`);
    console.log(`Allowed frontend origin: ${config.clientOrigin}`);
  });
}

start();
