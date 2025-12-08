import { create } from 'zustand';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,

  register: async (email, password, name) => {
    set({ loading: true, error: null });

    try {
      // TODO: POST запрос к БД
      console.log('Регистрация (фейк лог):', { email, name });

      set({
        isAuthenticated: true,
        user: { email, name },
        loading: false,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify({ email, name }));
      }
    } catch (err) {
      set({ error: 'Ошибка регистрации', loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      // TODO: POST запрос к БД
      console.log('Логин (фейк):', { email });

      const mockUser = { email, name: email.split('@')[0] };
      set({
        isAuthenticated: true,
        user: mockUser,
        loading: false,
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(mockUser));
      }
    } catch (err) {
      set({ error: 'Ошибка входа', loading: false });
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth');
    }
  },

  hydrateAuth: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth');
      if (stored) {
        try {
          const user = JSON.parse(stored);
          set({ isAuthenticated: true, user });
        } catch (e) {
          console.error('Не удалось восстановить сессию');
        }
      }
    }
  },
}));

export default useAuthStore;
