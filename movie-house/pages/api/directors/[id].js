import clientPromise from '../../../data/mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = await clientPromise;
  const db = client.db('movie-house');

  const director = await db.collection('directors').findOne({ id });
  if (!director) {
    return res.status(404).json({ message: 'Director not found' });
  }

  const movies = await db.collection('movies').find({ directorId: id }).toArray();
  res.status(200).json({ ...director, movies });
}
