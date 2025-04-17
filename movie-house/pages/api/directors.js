import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const enrichedDirectors = data.directors.map((director) => ({
    ...director,
    movies: data.movies.filter((movie) => movie.directorId === director.id),
  }));

  res.status(200).json(enrichedDirectors);
}
