import fs from 'fs';
import path from 'path';
import styles from '../../../styles/DirectorDetail.module.css';
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
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const movie = data.movies.find((m) => m.id === params.id);
  if (!movie) return { notFound: true };

  const director = data.directors.find((d) => d.id === movie.directorId);
  const directedMovies = data.movies.filter((m) => m.directorId === director.id);

  return {
    props: {
      director,
      directedMovies,
    },
    revalidate: 30,
  };
}

export default function DirectorDetail({ director, directedMovies }) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>{director.name}</h1>
        <p className={styles.bio}>{director.biography}</p>

        <h2 className={styles.subtitle}>Movies Directed</h2>
        <ul className={styles.list}>
          {directedMovies.map((movie) => (
            <li key={movie.id}>
              <Link href={`/movies/${movie.id}`} className={styles.link}>
                {movie.title} ({movie.releaseYear})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
