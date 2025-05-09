import clientPromise from '../../../data/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('movie-house');

  const directors = await db.collection('directors').find({}).toArray();
  const movies = await db.collection('movies').find({}).toArray();

  const enriched = directors.map((d) => ({
    ...d,
    movies: movies.filter((m) => m.directorId === d.id),
  }));

  res.status(200).json(enriched);
}
