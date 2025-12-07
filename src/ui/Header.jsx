'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '@styles/header.module.css';
import { BurgerMenu, Profile, Login } from '@/ui/Icons';

const Header = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const toggleAuthStatus = () => {
    setAuthStatus((prev) => !prev);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image src='/img/logo.svg' alt='logo image' width={362} height={81} />
      </div>

      <nav className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuLink}>
          <Link href={'/'}>Главная</Link>
        </div>
        <div className={styles.menuLink}>
          <Link href={'/'}>Рецепты</Link>
        </div>
        <div className={styles.menuLink}>
          <Link href={'/'}>Отправить рецепт</Link>
        </div>
      </nav>

      <div className={styles.authContainer}>
        {authStatus ? (
          <button className={styles.profileBtn} onClick={toggleAuthStatus}>
            <div className={styles.profileWrapper}>
              <Profile />
            </div>
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={toggleAuthStatus}>
            <div className={styles.loginWrapper}>
              <Login />
            </div>
            <span>Вход</span>
          </button>
        )}
      </div>

      <button className={styles.burgerMenuBtn} onClick={toggleMenu}>
        <div className={styles.burgerMenuWrapper}>
          <BurgerMenu />
        </div>
      </button>
    </header>
  );
};

export default Header;
