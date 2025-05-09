import clientPromise from '../../../data/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movie-house');

  const movies = await db.collection('movies').find({}).toArray();
  res.status(200).json(movies);
}
