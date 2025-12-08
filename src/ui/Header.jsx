'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import styles from '@styles/header.module.css';
import { PAGES } from '@config/pages.config';
import { useAuthStore } from '@store/authStore';
import { BurgerMenu, Profile, Login } from '@ui/Icons';
import Modal from '@ui/Modal';
import AuthForm from '@components/AuthForm';

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
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const { isAuth, logout } = useAuthStore();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <div className={styles.authContainer}>
        {isAuth ? (
          <button className={styles.profileBtn} onClick={handleLogout}>
            <div className={styles.profileToggle}>Вход</div>
            <div className={styles.profileWrapper}>
              <Profile />
            </div>
          </button>
        ) : (
          <button className={styles.loginBtn} onClick={toggleModal}>
            <div className={styles.loginWrapper}>
              <Login />
            </div>
            <span>Вход</span>
          </button>
        )}
      </div>
      {showModal && (
        <Modal onClose={toggleModal}>
          <AuthForm onClose={toggleModal} />
        </Modal>
      )}
    </>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerFlexBox}>
          <div className={styles.logoWrapper}>
            <Image
              src='/img/logo.svg'
              alt='logo image'
              width={362}
              height={81}
            />
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
    </>
  );
};

export default Header;
