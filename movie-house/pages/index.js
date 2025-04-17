import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import styles from '../styles/Home.module.css';

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  const trending = [...data.movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return {
    props: { trending },
    revalidate: 10,
  };
}

export default function Home({ trending }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Welcome to Movie House</h1>
        <h2 className={styles.subtitle}>Trending Movies</h2>
      </div>

      <div className={styles.movieGrid}>
        {trending.map((movie) => (
          <div key={movie.id} className={styles.card}>
            <h3>{movie.title}</h3>
            <p><strong>Year:</strong> {movie.releaseYear}</p>
            <p><em>{movie.description}</em></p>
            <p><strong>Rating:</strong> {movie.rating}</p>
          </div>
        ))}
      </div>

      <div className={styles.header}>
        <button
          onClick={() => router.push('/genres')}
          className={styles.button}
        >
          Browse Genres
        </button>
        <button
          onClick={() => router.push('/movies')}
          className={styles.button}
        >
          Browse All Movies
        </button>
        <button
          onClick={() => router.push('/directors')}
          className={styles.button}
        >
          All Directors
        </button>
        <br />
        <button
          onClick={() => router.push('/help/faqs')}
          className={styles.button}
        >
          FAQs
        </button>
        <button
          onClick={() => router.push('/help/contact')}
          className={styles.button}
        >
          Contact Us
        </button>
        <button
          onClick={() => router.push('/help/privacy')}
          className={styles.button}
        >
          Privacy Policy
        </button>
      </div>
    </div>
  );
}
