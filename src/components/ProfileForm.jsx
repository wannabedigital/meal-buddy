'use client';

import { useState } from 'react';

import { useAuthStore } from '@store/authStore';
import styles from '@styles/profileForm.module.css';

const ProfileForm = ({ onClose }) => {
  const { isAuth, updateInfo, logout } = useAuthStore();

  const [formData, setFormData] = useState({
    id: useAuthStore((state) => state.user?.id || ''),
    fullname: useAuthStore((state) => state.user?.fullname || ''),
    bio: useAuthStore((state) => state.user?.bio || ''),
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/profile/profileInfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: formData.id,
          fullname: formData.fullname,
          bio: formData.bio,
        }),
      });

      const data = await res.json();

      if (!res.ok) return;

      updateInfo(data.user);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isAuth) return null;

  return (
    <form className={styles.authForm} onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>Настройки профиля</h2>
      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Имя</span>
        <input
          name='fullname'
          className={styles.inputField}
          type='text'
          placeholder='Ваше имя'
          required
          value={formData.fullname}
          onChange={handleChange}
          autoComplete='name'
        />
      </label>
      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Расскажите о себе</span>
        <textarea
          name='bio'
          type='text'
          className={`${styles.inputField} ${styles.inputMessage}`}
          placeholder='Расскажите о себе'
          value={formData.bio}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
      <div className={styles.btnFlexContainer}>
        <div className={styles.buttonContainer}>
          <input
            className={styles.submitButton}
            type='submit'
            value={'Сохранить'}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
