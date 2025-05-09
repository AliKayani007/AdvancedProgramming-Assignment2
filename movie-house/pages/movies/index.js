import { useState } from 'react';
/* import fs from 'fs';
import path from 'path'; */
import styles from '../../styles/Movies.module.css';
import Link from 'next/link';

export async function getStaticProps() {
  const movieRes = await fetch('http://localhost:3000/api/movies');
  const genreRes = await fetch('http://localhost:3000/api/genres');

  const movies = await movieRes.json();
  const genres = await genreRes.json();

  return {
    props: { movies, genres },
    revalidate: 60,
  };

  /* const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
    },
    revalidate: 10,
  }; */
}

export default function Movies({ movies, genres }) {
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filteredMovies = selectedGenre === 'all' ? movies : movies.filter((m) => m.genreId === selectedGenre);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Movies</h1>

      <div className={styles.filter}>
        <label htmlFor="genre">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.grid}>
        {filteredMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} className={styles.card}>
            <div>
              <h3>{movie.title}</h3>
              <p><strong>Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
