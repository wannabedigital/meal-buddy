'use client';

import Image from 'next/image';
import { useState } from 'react';

import styles from '@styles/page.module.css';
import AuthForm from '@components/AuthForm';
import Modal from '@ui/Modal';
import { useAuthStore } from '@store/authStore';
import AddRecipeForm from '@/components/AddRecipeForm';

export default function AddRecipe() {
  const { isAuth } = useAuthStore();
  const userId = useAuthStore((state) => state.user?.id ?? null);

  const [showModal, setShowModal] = useState(true);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <main className={styles.page}>
        {isAuth ? (
          <AddRecipeForm />
        ) : (
          <div className={styles.notLogin}>
            Войдите в аккаунт для добавления рецепта
          </div>
        )}
      </main>
      {!isAuth && showModal && (
        <Modal onClose={toggleModal}>
          <AuthForm onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
}
