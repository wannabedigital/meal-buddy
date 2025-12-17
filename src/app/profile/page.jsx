'use client';
import Image from 'next/image';

import styles from '@styles/page.module.css';
import ProfileInfo from '@components/ProfileInfo';
import AuthForm from '@components/AuthForm';
import { useAuthStore } from '@store/authStore';
import FavoritesList from '@components/FavoritesList';

export default function Profile() {
  const { isAuth } = useAuthStore();

  if (!isAuth)
    return (
      <main className={styles.page}>
        <section className={styles.authForm}>
          <h1 className={styles.pageTitle}>Необходимо авторизоваться</h1>
          <AuthForm />
          {isAuth}
        </section>
      </main>
    );

  return (
    <main className={styles.page}>
      <section className={styles.profile}>
        <ProfileInfo />
        <div className={styles.favoriteList}>
          <h2 className={styles.favoriteTitle}>Избранное</h2>
          <div className={styles.favoriteRecipes}>
            <FavoritesList />
          </div>
        </div>
      </section>
    </main>
  );
}
