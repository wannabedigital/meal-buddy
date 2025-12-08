'use client';

import Link from 'next/link';
import { useState } from 'react';

import styles from '@styles/authForm.module.css';
import { useAuthStore } from '@store/authStore';

const AuthForm = ({ onClose }) => {
  const { login, register } = useAuthStore();

  const [mode, setMode] = useState('login');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username: formData.username,
      email: formData.email,
      role: 'user',
    };

    mode === 'login' ? login(userData) : register(userData);

    onClose();
  };

  return (
    <form className={styles.authForm} method='post' onSubmit={handleSubmit}>
      <h2 className={styles.formTitle}>
        {mode === 'login' ? 'Авторизация' : 'Регистрация'}
      </h2>
      {mode === 'register' && (
        <label className={styles.fieldContainer}>
          <span className={styles.fieldLabel}>Пользователь</span>
          <input
            name='username'
            className={styles.inputField}
            placeholder='username'
            value={formData.username}
            onChange={handleChange}
            autoComplete='off'
          />
        </label>
      )}
      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Эл. Почта</span>
        <input
          name='email'
          className={styles.inputField}
          type='email'
          placeholder='example@gmail.com'
          required
          value={formData.email}
          onChange={handleChange}
          autoComplete='email'
        />
      </label>
      <label className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Пароль</span>
        <input
          name='password'
          className={styles.inputField}
          placeholder='PaSsWord++'
          value={formData.password}
          onChange={handleChange}
          autoComplete='off'
        />
      </label>
      <div className={styles.privacyAgreement}>
        <label className={styles.checkboxLabel}>
          <input className={styles.checkboxInput} type='checkbox' required />
          <span className={styles.customCheckbox}></span>
          <div className={styles.checkboxSpan}>
            Я соглашаюсь с{' '}
            <Link
              className={styles.legalLink}
              href={'#'}
              target='_blank'
              rel='noopener'
            >
              &laquo;Политикой конфиденциальности&raquo;
            </Link>{' '}
            и{' '}
            <Link
              className={styles.legalLink}
              href={'#'}
              target='_blank'
              rel='noopener'
            >
              &laquo;Пользовательским соглашением&raquo;
            </Link>
            .
          </div>
        </label>
      </div>

      <div className={styles.changeMode}>
        {mode === 'login' ? (
          <span>
            Еще нет аккаунта?
            <button className={styles.changeModeBtn} onClick={toggleMode}>
              Создать аккаунт
            </button>
          </span>
        ) : (
          <span>
            Уже есть аккаунт?
            <button className={styles.changeModeBtn} onClick={toggleMode}>
              Вход
            </button>
          </span>
        )}
      </div>

      <div className={styles.buttonContainer}>
        <input
          className={styles.submitButton}
          type='submit'
          value={mode === 'login' ? 'Войти' : 'Создать аккаунт'}
        />
      </div>
    </form>
  );
};

export default AuthForm;
