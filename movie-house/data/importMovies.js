import { MongoClient } from 'mongodb';
import 'dotenv/config';
import fs from 'fs';

const url = process.env.MONGODB_URL;
const client = new MongoClient(url);

async function run() {
    try {
      await client.connect();
      const db = client.db('movie-house');
  
      const data = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));
  
      await db.collection('movies').insertMany(data.movies);
      await db.collection('genres').insertMany(data.genres);
      await db.collection('directors').insertMany(data.directors);
  
      console.log('Data successfully imported to MongoDB');
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      await client.close();
    }
  }
  
  run();