import styles from '../../styles/Help.module.css';
import Link from 'next/link';

export default function HelpHome() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Help Center</h1>
      <p className={styles.content}>
        Welcome to the Movie House Help Center. Choose a topic:
      </p>
      <div className={styles.links}>
        <Link href="/help/faqs">FAQs</Link>
        <Link href="/help/contact">Contact</Link>
        <Link href="/help/privacy">Privacy Policy</Link>
      </div>
    </div>
  );
}
