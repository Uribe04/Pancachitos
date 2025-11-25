import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: number[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Cargar favoritos desde localStorage basado en el email del usuario actual
    hydrateFavorites: (state, action: PayloadAction<string | null>) => {
      if (!action.payload) {
        state.favoriteIds = [];
        return;
      }
      const key = `bakery_favorites_${action.payload}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try {
          state.favoriteIds = JSON.parse(stored);
        } catch (error) {
          console.error('Error hydrating favorites:', error);
        }
      }
    },

    // Agregar favorito
    addFavorite: (state, action: PayloadAction<{ productId: number; userEmail: string }>) => {
      if (!state.favoriteIds.includes(action.payload.productId)) {
        state.favoriteIds.push(action.payload.productId);
        const key = `bakery_favorites_${action.payload.userEmail}`;
        localStorage.setItem(key, JSON.stringify(state.favoriteIds));
        window.dispatchEvent(new Event('favoriteUpdated'));
      }
    },

    // Eliminar favorito
    removeFavorite: (state, action: PayloadAction<{ productId: number; userEmail: string }>) => {
      state.favoriteIds = state.favoriteIds.filter((id) => id !== action.payload.productId);
      const key = `bakery_favorites_${action.payload.userEmail}`;
      localStorage.setItem(key, JSON.stringify(state.favoriteIds));
      window.dispatchEvent(new Event('favoriteUpdated'));
    },

    // Limpiar favoritos (al hacer logout)
    clearFavorites: (state) => {
      state.favoriteIds = [];
    },

    // Limpiar favoritos de localStorage del usuario actual
    clearFavoritesFromStorage: (state, action: PayloadAction<string | null>) => {
      if (action.payload) {
        const key = `bakery_favorites_${action.payload}`;
        localStorage.removeItem(key);
      }
      state.favoriteIds = [];
    },
  },
});

export const { hydrateFavorites, addFavorite, removeFavorite, clearFavorites, clearFavoritesFromStorage } = favoritesSlice.actions;
export default favoritesSlice.reducer;
