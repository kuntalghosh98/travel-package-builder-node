import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const mode = process.env.NODE_ENV || 'development';

const envFiles = [
  `.env.${mode}.local`,
  `.env.${mode}`,
  '.env.local',
  '.env'
];

for (const file of envFiles) {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    dotenv.config({ path: filePath });
  }
}

export const envMode = mode;
