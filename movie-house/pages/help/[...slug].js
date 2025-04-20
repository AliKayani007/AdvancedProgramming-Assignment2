import styles from '../../styles/Help.module.css';
import Link from 'next/link';

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: ['faqs'] } },
      { params: { slug: ['contact'] } },
      { params: { slug: ['privacy'] } },
    ],
    fallback: false, // All help pages are pre-built
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug || [];

  let pageData = {
    title: 'Help Center',
    content: 'Welcome to the Movie House Help Center. Select a topic below.',
  };

  if (slug[0] === 'faqs') {
    pageData = {
      title: 'FAQs',
      content: 'Q: How do I browse movies?\nA: Use the Browse Genres or All Movies pages.',
    };
  } else if (slug[0] === 'contact') {
    pageData = {
      title: 'Contact Us',
      content: 'You can reach us at support@moviehouse.com or call 123-456-7890.',
    };
  } else if (slug[0] === 'privacy') {
    pageData = {
      title: 'Privacy Policy',
      content: 'We respect your privacy and do not collect personal information.',
    };
  }

  return {
    props: { pageData },
  };
}

export default function HelpPage({ pageData }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{pageData.title}</h1>
      <p className={styles.content}>{pageData.content}</p>

      <div className={styles.links}>
        <Link href="/help/faqs">FAQs</Link>
        <Link href="/help/contact">Contact</Link>
        <Link href="/help/privacy">Privacy Policy</Link>
      </div>
    </div>
  );
}
