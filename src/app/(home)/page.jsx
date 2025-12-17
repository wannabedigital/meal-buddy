import Image from 'next/image';
import styles from '@styles/page.module.css';
import HomeCarousel from '@components/HomeCarousel';
import HomeOffer from '@ui/HomeOffer';

export default function Home() {
  return (
    <main className={styles.page}>
      <HomeOffer />
      <HomeCarousel />
    </main>
  );
}
