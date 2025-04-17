import fs from 'fs';
import path from 'path';
import styles from '../../../styles/MovieDetail.module.css';
import Link from 'next/link';

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: 'blocking', // on-demand page generation
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === params.id);
  const director = data.directors.find((d) => d.id === movie?.directorId);
  const genre = data.genres.find((g) => g.id === movie?.genreId);

  if (!movie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      movie,
      directorName: director ? director.name : 'Unknown',
      genreName: genre ? genre.name : 'Unknown',
    },
    revalidate: 30,
  };
}

export default function MovieDetail({ movie, directorName, genreName }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{movie.title}</h1>
        <p><strong>Year:</strong> {movie.releaseYear}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Genre:</strong> {genreName}</p>
        <p className={styles.desc}><em>{movie.description}</em></p>
        <p><strong>Director:</strong> <Link href={`/movies/${movie.id}/director`} className={styles.link}>{directorName}</Link></p>
      </div>
    </div>
  );
}
