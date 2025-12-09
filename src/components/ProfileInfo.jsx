'use client';
import Image from 'next/image';

import styles from '@styles/profile.module.css';
import { useAuthStore } from '@/store/authStore';
import { Profile, OptionsIcon } from '@ui/Icons';

const ProfileInfo = () => {
  const username = useAuthStore((state) => state.user?.username || '');

  return (
    <div className={styles.profile}>
      <div className={styles.profilePhotos}>
        <div className={styles.profileBgWrapper}></div>
        <div className={styles.profilePhotoWrapper}>
          <Profile />
          <div className={styles.profilePhotoBg}></div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.profileInfo}>
          <p className={styles.profileUsername}>{username}</p>
          <div className={styles.profileRecipeCount}>
            Отправлено рецептов -{' '}
          </div>
        </div>
        <button className={styles.optionsBtn}>
          <OptionsIcon />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
