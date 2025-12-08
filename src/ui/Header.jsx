'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import styles from '@styles/header.module.css';
import { BurgerMenu, Profile, Login } from '@ui/Icons';
import { PAGES } from '@config/pages.config';

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.headerNav}>
      <div className={styles.menuLink}>
        <Link
          href={PAGES.home.link}
          className={
            pathname === PAGES.home.link ? styles.activeNavLink : styles.navLink
          }
        >
          {PAGES.home.name}
        </Link>
      </div>
      <div className={styles.menuLink}>
        <Link
          href={PAGES.recipes.link}
          className={
            pathname === PAGES.recipes.link
              ? styles.activeNavLink
              : styles.navLink
          }
        >
          {PAGES.recipes.name}
        </Link>
      </div>
      <div className={styles.menuLink}>
        <Link
          href={PAGES.addRecipe.link}
          className={
            pathname === PAGES.addRecipe.link
              ? styles.activeNavLink
              : styles.navLink
          }
        >
          {PAGES.addRecipe.name}
        </Link>
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
          <div className={styles.profileToggle}>Вход</div>
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
