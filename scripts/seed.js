import 'dotenv/config';
import fs from 'fs/promises';
import mongoose from 'mongoose';
import { config } from '../src/config/index.js';
import { connectDB } from '../src/config/db.js';
import { models } from '../src/models/index.js';

async function seed() {
  const force = process.argv.includes('--force');
  const raw = await fs.readFile(config.seedPath, 'utf8');
  const data = JSON.parse(raw);

  await connectDB();

  for (const collectionName of config.collections) {
    const Model = models[collectionName];
    const items = data[collectionName] || [];
    const existing = await Model.countDocuments();

    if (existing > 0 && !force) {
      console.log(`Skipped ${collectionName}: ${existing} documents already exist`);
      continue;
    }

    if (existing > 0) {
      await Model.deleteMany({});
    }

    if (items.length > 0) {
      await Model.insertMany(items);
    }

    console.log(`Seeded ${collectionName}: ${items.length} documents`);
  }

  await mongoose.disconnect();
  console.log('Seed complete');
}

seed().catch(error => {
  console.error('Seed failed:', error.message);
  process.exit(1);
});
