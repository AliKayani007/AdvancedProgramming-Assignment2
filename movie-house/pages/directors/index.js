import useSWR from 'swr';
import styles from '../../styles/Directors.module.css';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Directors() {
  const { data, error } = useSWR('/api/directors', fetcher);

  if (error) return <div className={styles.container}>Failed to load.</div>;
  if (!data) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎬 Directors</h1>
      <div className={styles.grid}>
        {data.map((director) => (
          <div key={director.id} className={styles.card}>
            <h2>{director.name}</h2>
            <p className={styles.bio}>{director.biography}</p>
            <h3>Movies:</h3>
            <ul>
              {director.movies.map((movie) => (
                <li key={movie.id}>
                  {movie.title} ({movie.releaseYear})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
