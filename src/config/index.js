import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../..');

const nodeEnv = process.env.NODE_ENV || 'development';
const port = Number(process.env.PORT) || 3001;
const baseUrl = (process.env.BASE_URL || `http://localhost:${port}`).replace(/\/$/, '');
const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');

export const config = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port,
  baseUrl,
  frontendUrl,
  apiUrl: `${baseUrl}/api`,
  mongodbUri: process.env.MONGODB_URI || '',
  clientOrigin: process.env.CLIENT_ORIGIN || frontendUrl,
  seedPath: process.env.SEED_PATH || path.join(rootDir, 'data', 'db.json'),
  collections: ['packages', 'folders', 'templates'],
  idPrefixes: {
    packages: 'pkg',
    folders: 'folder',
    templates: 'template'
  }
};
