import Image from 'next/image';

import styles from '@styles/page.module.css';
import ProfileInfo from '@components/ProfileInfo';

export default function Profile() {
  
  return (
    <main className={styles.page}>
      <section className={styles.profile}>
        <ProfileInfo />
      </section>
    </main>
  );
}
