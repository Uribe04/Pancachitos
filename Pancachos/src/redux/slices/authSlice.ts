import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login action
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Persistir en localStorage
      localStorage.setItem('bakery_user', JSON.stringify(action.payload));
    },
    
    // Logout action
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Limpiar localStorage
      localStorage.removeItem('bakery_user');
      // Limpiar datos del usuario (carrito y favoritos)
      localStorage.removeItem('cartItems');
      // Favoritos se limpian con la acción clearFavorites en favoritesSlice
    },
    
    // Update current user
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('bakery_user', JSON.stringify(state.user));
      }
    },
    
    // Cargar usuario desde localStorage (para hidratar el store al iniciar)
    hydrateAuth: (state) => {
      const storedUser = localStorage.getItem('bakery_user');
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser);
          state.isAuthenticated = true;
        } catch (error) {
          console.error('Error hydrating auth:', error);
        }
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, clearUser, updateUser, hydrateAuth, setLoading } = authSlice.actions;
export default authSlice.reducer;
