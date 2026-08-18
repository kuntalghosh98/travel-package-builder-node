import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '../..');

export const config = {
  port: Number(process.env.PORT) || 3001,
  mongodbUri: process.env.MONGODB_URI || '',
  clientOrigin: process.env.CLIENT_ORIGIN || '',
  seedPath: process.env.SEED_PATH || path.join(rootDir, 'data', 'db.json'),
  collections: ['packages', 'folders', 'templates'],
  idPrefixes: {
    packages: 'pkg',
    folders: 'folder',
    templates: 'template'
  }
};
