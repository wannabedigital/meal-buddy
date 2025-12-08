import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuth: false,

  register: (userData) =>
    set(
      {
        user: userData,
        isAuth: true,
      },
      console.log(userData)
    ),

  login: (userData) =>
    set(
      {
        user: userData,
        isAuth: true,
      },
      console.log(userData)
    ),

  logout: () =>
    set(
      {
        user: null,
        isAuth: false,
      },
      console.log('Вы вышли из аккаунта')
    ),
}));
