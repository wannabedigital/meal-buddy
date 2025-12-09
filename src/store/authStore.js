import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useAuthStore = create(
  persist((set) => ({
    user: null,
    isAuth: false,

    register: (userData) =>
      set(
        {
          user: userData,
          isAuth: true,
        },
        console.log('Вы зарегестрированы'),
        console.log(userData)
      ),

    login: (userData) =>
      set(
        {
          user: userData,
          isAuth: true,
        },
        console.log('Вы вошли в аккаунт'),
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
  })),
  {
    name: 'auth-storage',
    storage: createJSONStorage(() => localStorage),
  }
);
