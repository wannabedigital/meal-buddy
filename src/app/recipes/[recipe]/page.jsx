import Image from 'next/image';
import styles from '@styles/page.module.css';

export default async function Recipe({ params }) {
  const { recipe } = await params;

  return <main className={styles.page}>{recipe}</main>;
}
