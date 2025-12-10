'use client';
import Image from 'next/image';
import { useState } from 'react';

import styles from '@styles/profile.module.css';
import { useAuthStore } from '@/store/authStore';
import ProfileForm from '@components/ProfileForm';
import { Profile, OptionsIcon } from '@ui/Icons';
import Modal from '@ui/Modal';

const ProfileInfo = () => {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const username = useAuthStore((state) => state.user?.username || '');

  return (
    <>
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
          <button className={styles.optionsBtn} onClick={toggleModal}>
            <OptionsIcon />
          </button>
        </div>
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ProfileForm onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

export default ProfileInfo;
