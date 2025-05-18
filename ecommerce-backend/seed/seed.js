import 'dotenv/config';
import mongoose from 'mongoose';
import fs from 'fs/promises';
import path from 'path';
import Product from '../src/models/Product.js';

mongoose.set('strictQuery', false);

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGO_URL);
  console.log('Connected.');

  console.log('Clearing products...');
  await Product.deleteMany({});

  const filePath = path.resolve('seed/products.json');
  const file = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(file);

  console.log(`Inserting ${data.length} products...`);
  await Product.insertMany(data);

  console.log('Done.');
  process.exit(0);
}

run().catch(err => {
  console.error('Error during seed:', err);
  process.exit(1);
});
