import { useRouter } from 'next/router';
import styles from '../styles/NotFound.module.css';

export default function Custom404() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <h2 className={styles.message}>Oops! That page does not exist.</h2>
      <p className={styles.tip}>Try checking the URL or return to the homepage.</p>
      <button className={styles.button} onClick={() => router.push('/')}>
        Go Home
      </button>
    </div>
  );
}
