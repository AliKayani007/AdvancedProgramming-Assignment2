// pages/api/movies/[id].js
import clientPromise from '../../../data/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('movie-house');

  const movie = await db.collection('movies').findOne({ id });

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
}
