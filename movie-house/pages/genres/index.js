import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import styles from '../../styles/Genres.module.css';

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'movies.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const data = JSON.parse(jsonData);

  return {
    props: {
      genres: data.genres,
    },
  };
}

export default function Genres({ genres }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Browse Genres</h1>

      <div className={styles.grid}>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`} className={styles.card}>
            <div>
              <h3>{genre.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
