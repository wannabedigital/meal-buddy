'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '@styles/header.module.css';
import { BurgerMenu, Profile, Login } from '@/ui/Icons';

const HeaderMenu = () => {
  return (
    <nav className={styles.headerNav}>
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
  );
};

const MobileMenu = ({ isMenuOpen = false }) => {
  return (
    <div
      className={`${styles.mobileMenu} ${
        isMenuOpen ? styles.mobileMenuOpen : ''
      }`}
    >
      <HeaderMenu />
    </div>
  );
};

const HeaderLogin = () => {
  const [authStatus, setAuthStatus] = useState(false);
  const toggleAuthStatus = () => {
    setAuthStatus((prev) => !prev);
  };

  return (
    <div className={styles.authContainer}>
      {authStatus ? (
        <button className={styles.profileBtn} onClick={toggleAuthStatus}>
          <span className={styles.profileToggle}>Вход</span>
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
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerFlexBox}>
        <div className={styles.logoWrapper}>
          <Image src='/img/logo.svg' alt='logo image' width={362} height={81} />
        </div>

        <div className={styles.desktopMenu}>
          <HeaderMenu />
        </div>

        <HeaderLogin />

        <button className={styles.burgerMenuBtn} onClick={toggleMenu}>
          <div className={styles.burgerMenuWrapper}>
            <BurgerMenu />
          </div>
        </button>
      </div>

      <MobileMenu isMenuOpen={isMenuOpen} />
      <div className={styles.headerBg}></div>
    </header>
  );
};

export default Header;
