'use client';
import Link from 'next/link';

import styles from '@styles/favorite.module.css';
import { AddFavorite, DeleteFavorite } from '@ui/Icons';

const FavoriteButton = ({ isAuth, favorited = false, onLike, onDislike }) => {
  const button = favorited ? (
    <button className={styles.like} onClick={onDislike}>
      <DeleteFavorite />
    </button>
  ) : (
    <button className={styles.dislike} onClick={onLike}>
      <AddFavorite />
    </button>
  );

  return (
    <div className={styles.favoriteBtn}>
      {isAuth ? (
        button
      ) : (
        <Link href={'/profile'}>
          <AddFavorite />
        </Link>
      )}
    </div>
  );
};

export default FavoriteButton;
