import fs from 'fs';
import path from 'path';
import styles from '../../../styles/GenreDetail.module.css';
import Link from 'next/link';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const genre = data.genres.find((g) => g.id === id);
  const movies = data.movies.filter((m) => m.genreId === id);

  if (!genre) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      genre,
      movies,
    },
  };
}

export default function GenreDetail({ genre, movies }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{genre.name} Movies</h1>

      {movies.length === 0 ? (
        <p className={styles.empty}>No movies found in this genre.</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <Link key={movie.id} href={`/movies/${movie.id}`} className={styles.card}>
              <div>
                <h3>{movie.title}</h3>
                <p><strong>Year:</strong> {movie.releaseYear}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
